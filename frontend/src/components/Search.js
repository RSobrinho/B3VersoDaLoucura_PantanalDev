import React from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import env from "react-dotenv";

const baseURL = `${env.URL_BACK}:${env.PORT_BACK}/api/v1`;

export default () => {
  async function createPost(link) {
    const response = await axios.post(`${baseURL}/scraping`, {
      link,
    });
    return response.data;
  }

  async function toPost() {
    const link = document.getElementById("input-link").value;
    const res = await createPost(link);

    // Test porpuses
    console.log("Printing data from request...");
    console.log(res);
    console.log("End of data.");

    const NewsModal = document.getElementById("news-modal");

    if (NewsModal) {
      NewsModal.addEventListener("show.bs.modal", () => {
        const title = NewsModal.querySelector("#title-news");
        const content = NewsModal.querySelector("#content-news");
        const link = NewsModal.querySelector("#link-news");
        const date = NewsModal.querySelector("#date-news");
        const dt = new Date(res.scraping.news.date);
        const sentiment_news = NewsModal.querySelector("#sentiment-news");
        const sentiment_color_news = NewsModal.querySelector(
          "#sentiment-color-news"
        );

        const getSentiment = () => {
          if (res.scraping.news.sentiment.positive == 100)
            return ["text-success", "Positivo"];
          else if (res.scraping.news.sentiment.neutral == 100)
            return ["text-warning", "Neutro"];
          return ["text-danger", "Negativo"];
        };
        const sentiment = getSentiment();

        title.textContent = res.scraping.news.title;
        content.textContent = res.scraping.news.description;
        link.href = res.scraping.link;
        sentiment_news.textContent = sentiment[1];
        sentiment_color_news.classList.remove("text-success");
        sentiment_color_news.classList.remove("text-warning");
        sentiment_color_news.classList.remove("text-danger");
        sentiment_color_news.classList.add(sentiment[0]);

        function pad(s) {
          return s < 10 ? "0" + s : s;
        }
        date.textContent = [
          pad(dt.getDate()),
          pad(dt.getMonth() + 1),
          dt.getFullYear(),
        ].join("/");
      });

      const myModal = new Modal("#news-modal", {
        keyboard: false,
      });

      myModal.show();
    }
  }

  return (
    <React.Fragment>
      <div className="d-flex flex-column justify-content-center h-100">
        <h1 className="fw-medium fst-italic" style={{ fontSize: "3rem" }}>
          Avalie uma notícia
        </h1>
        <p className="lead">
          Insira um link abaixo de uma notícia para avaliar seu sentimento e
          impacto em relação a B3
        </p>
        <form className="row justify-content-center align-items-center w-100 py-3">
          <div className="col-12 col-lg-8">
            <div className="input-search input-group input-group-lg border rounded-5 p-1 px-2 bg-white">
              <input
                type="text"
                className="form-control border-0"
                placeholder="Coloque o link da notícia que deseja avaliar..."
                id="input-link"
                // onChange={(e) => setLink(e.target.value)}
              />
              <button
                type="button"
                className="input-group-text border-0 bg-transparent"
                onClick={toPost}
              >
                <i className="fas fa-search text-default"></i>
              </button>
            </div>
            <button
              type="button"
              className="seleciona-intervalo btn btn-link"
              data-bs-toggle="modal"
              data-bs-target="#temp-modal"
            >
              Selecione o intervalo de tempo
            </button>
          </div>
        </form>
        <p className="lead legenda">Tipos de avaliações</p>
        <p className="lead d-flex gap-3 justify-content-center">
          <a
            href="assessment.html"
            className="text-decoration-none h3 fw-light text-dark"
          >
            <i className="fas fa-circle text-success m-2"></i>
            <span className="lead">Positiva</span>
          </a>
          <a
            href="assessment.html"
            className="text-decoration-none h3 fw-light text-dark"
          >
            <i className="fas fa-circle text-danger m-2"></i>
            <span className="lead">Negativa</span>
          </a>
          <a
            href="assessment.html"
            className="text-decoration-none h3 fw-light text-dark"
          >
            <i className="fas fa-circle text-warning m-2"></i>
            <span className="lead">Neutra</span>
          </a>
        </p>
      </div>
    </React.Fragment>
  );
};
