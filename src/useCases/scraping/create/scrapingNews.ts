import axios from "axios";
import { load } from "cheerio";
import { ScrapingDTO } from "./scrapingDTO";

export class ScrapingNews {
  public async execute(params: ScrapingDTO): Promise<ScrapingDTO> {
    let content = "";
    let res: ScrapingDTO = { link: params.link };

    await axios
      .get(params.link, {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      })
      .then((response) => {
        const $ = load(response.data);

        let title = $("h1").text();
        title = title.replace(/\n|\t/g, "");

        $("p").each((index, element) => {
          content += " " + $(element).text();
        });

        // Remove toda formatação de espaços não desejados ou identações
        const newContent = content.split(" ");
        const filterContent = Object.entries(newContent).filter(
          (value) => value[1] || (!value[1] && value[1] == "0")
        );
        const arrayContent = filterContent.map((obj) => obj[1]);

        content = arrayContent.join(" ");
        content = content.replace(/\n|\t/g, "");

        // Procura possíveis datas encontradas no content
        const dt = Array.from(
          $("body")
            .text()
            .matchAll(/(\d{1,2}\/\d{1,2}\/\d{4})|(\d{4}-\d{2}-\d{2})/g),
          (match) => match[0]
        );

        // Em caso de não encontrar nada no content
        if (content === "" && params.content) {
          content = params.content; // Coloca como content a descrição encontrada no Google
        }

        // Procura e pega a primeira data no content
        let dtNew: Date = null;

        dt.forEach((data) => {
          const newDate =
            data.length === 10 &&
            data.slice(-4).indexOf("/") == -1 &&
            data.slice(-4).indexOf("-") == -1
              ? data.slice(3, 5) + "-" + data.slice(0, 2) + "-" + data.slice(-4)
              : data;
          const parsedDate = new Date(newDate);
          const dtFormatted = parsedDate.toLocaleDateString("pt-BR");

          if (
            dtNew === null &&
            parsedDate >= new Date("2015-01-01") &&
            parsedDate <= new Date()
          ) {
            dtNew = parsedDate;
          }

          content = content.replace(dtFormatted, "");
          content = content.replace(data, "");
        });

        // Em caso de não encontrar data no content
        if (dtNew === null) {
          dtNew = new Date(); // Pega data atual como substituta
        }

        // Verifica a existência de todos os campos pegos
        res =
          title && content !== "" && params.link && dtNew
            ? {
                title,
                link: params.link,
                date: dtNew.toISOString(),
                content,
              }
            : null;
      })
      .catch((error) => {
        res = null;
      });

    return res;
  }
}
