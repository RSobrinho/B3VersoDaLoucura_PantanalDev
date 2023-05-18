import axios from "axios";
import { load } from "cheerio";
import { ScrapingDTO } from "./scrapingDTO";

export class ScrapingGoogleNews {
  private query = [
    "b3",
    "b3 bolsa de valores",
    "b3 financiamento de veiculos",
    "b3 bovespa",
  ];
  private num = 150;
  private dup = [];
  private pages = [0];

  public async execute(
    initial_date: Date,
    final_date?: Date
  ): Promise<ScrapingDTO[]> {
    const data: ScrapingDTO[] = [];

    if (!final_date) {
      final_date = new Date();
    }

    let init_day = initial_date.getDate();
    let final_day = final_date.getDate();

    init_day = init_day == 31 ? 1 : init_day + 1;
    final_day = final_day == 31 ? 1 : final_day + 1;

    let init = `${
      initial_date.getMonth() + 1
    }/${init_day}/${initial_date.getFullYear()}`;
    let final = `${
      final_date.getMonth() + 1
    }/${final_day}/${final_date.getFullYear()}`;

    for (const page of this.pages) {
      for (const q of this.query) {
        const encodedQuery = encodeURIComponent(q);
        const newLink = `https://www.google.com/search?q=${encodedQuery}&tbas=0&tbs=cdr:1,cd_min:${init},cd_max:${final},lr:lang_1pt&tbm=nws&sxsrf=APwXEdclVuQrgls4z9tt-x0-JUeU9kfrYw:1682198361057&source=lnt&lr=lang_pt&sa=X&ved=2ahUKEwipooKetb7-AhUMrJUCHckHDkoQpwV6BAgBEBY&biw=1536&bih=754&dpr=1.25&num=${this.num}&start=${page}`;

        // console.log(newLink);

        try {
          const response = await axios.get(newLink);
          const $ = load(response.data);

          $("div.Gx5Zad").each((index, element) => {
            const linkElement = $(element).find('a[href^="/url?q=https"]');

            if (linkElement.length) {
              const titleElement = $(element).find("div.BNeawe.vvjwJb.AP7Wnd");
              const descElement = $(element).find("div.BNeawe.s3v9rd.AP7Wnd");
              const dateElement = $(element).find("span.r0bn4c.rQMQod");
              const rawLink = linkElement
                .attr("href")
                .split("/url?q=")[1]
                .split("&sa=U&")[0];

              let title = "";
              let desc = "";
              let date = "";

              if (titleElement.length) {
                title = titleElement
                  .text()
                  .replace(";", ",")
                  .replace("...", "");
              }
              if (descElement.length) {
                desc = descElement.text().replace(";", ",");
              }
              if (dateElement.length) {
                date = dateElement.text();
              }

              if (
                title &&
                desc &&
                date &&
                rawLink &&
                !this.dup.includes(title) &&
                (title.toString().toLowerCase().indexOf("b3") != -1 ||
                  desc.toString().toLowerCase().indexOf("b3") != -1)
              ) {
                this.dup.push(title);
                data.push({ title, content: desc, date, link: rawLink });
              }
            }
          });
        } catch (err) {
          console.error(err);
        }
      }
    }

    return data;
  }
}
