import React from "react";
import GraphModal from "./GraphModal";
import SpaceOfTimeModal from "./SpaceOfTimeModal";
import NewsTable from "./NewsTable";
import getNews from "./getNews";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import env from "react-dotenv";
import { getQueryParams } from "./page";
import $ from "jquery";

export default (props) => {
  let [dataChart, setDataChart] = React.useState(null);
  let [dataTable, setDataTable] = React.useState(null);
  const urlParams = getQueryParams(window.location.href);
  let initial_date = "";
  let final_date = "";

  if (urlParams && urlParams.initial_date && urlParams.final_date) {
    initial_date = urlParams.initial_date;
    final_date = urlParams.final_date;
    dataTable = urlParams;
  } else {
    let dateNow = new Date().toISOString().split("T")[0];
    initial_date = dateNow;
    final_date = dateNow;
  }

  const newsSearch = () => {
    const init = document.getElementById("input-initial-date").value;
    const final = document.getElementById("input-final-date").value;

    if (init && final) {
      let link = window.location.href;
      link = link.split("?")[0];
      const url = `${link}?initial_date=${init}&final_date=${final}`;
      window.location.href = url;
      setDataTable({ initial_date: init, final_date: final });
      document.location.reload();
    }
  };

  const NewsModal = document.getElementById("news-modal");

  if (NewsModal) {
    NewsModal.addEventListener("show.bs.modal", (event) => {
      const button = event.relatedTarget;
      const title = NewsModal.querySelector("#title-news");
      const content = NewsModal.querySelector("#content-news");
      const link = NewsModal.querySelector("#link-news");
      const date = NewsModal.querySelector("#date-news");
      const sentiment_news = NewsModal.querySelector("#sentiment-news");
      const sentiment_color_news = NewsModal.querySelector(
        "#sentiment-color-news"
      );

      const getSentiment = () => {
        if (button.getAttribute("data-color") == "success")
          return ["text-success", "Positivo"];
        else if (button.getAttribute("data-color") == "warning")
          return ["text-warning", "Neutro"];
        return ["text-danger", "Negativo"];
      };
      const sentiment = getSentiment();

      const dt = new Date(button.getAttribute("data-dt-news"));
      title.textContent = button.getAttribute("data-title");
      content.textContent = button.getAttribute("data-content");
      link.href = button.getAttribute("data-url");
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
  }

  return (
    <div className="text-center">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="fw-normal h2">Avaliações</h1>
        <div className="d-flex align-items-center justify-content-center gap-2 h5 fw-italic">
          <div className="d-flex gap-1 align-items-center">
            <span>Inicio: </span>
            <input
              type="date"
              className="form-control"
              id="input-initial-date"
              defaultValue={initial_date}
            />
          </div>

          <div className="d-flex gap-1 align-items-center">
            <span>Fim: </span>
            <input
              type="date"
              className="form-control"
              id="input-final-date"
              defaultValue={final_date}
            />
          </div>

          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              className="btn btn-primary"
            >
              <i className="fal fa-filter"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
              <Dropdown.Item href="#/action-1" active>
                <i className="fas fa-circle text-success m-2"></i>
                <span className="lead">Positivas</span>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                <i className="fas fa-circle text-warning m-2"></i>
                <span className="lead">Neutra</span>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                <i className="fas fa-circle text-danger m-2"></i>
                <span className="lead">Negativa</span>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <button
            type="button"
            className="btn btn-primary"
            onClick={newsSearch}
          >
            <i className="far fa-search"></i>
          </button>

          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#graphModal"
          >
            <i className="far fa-chart-pie-alt"></i>
          </button>
        </div>
      </div>

      <div id="table-news" className="table-responsive tb-default py-2">
        <NewsTable
          data={dataTable}
          dataChart={(news) => setDataChart(news)}
          chart={dataChart}
        />
      </div>
      <GraphModal
        news={dataChart}
        title="initial_date"
        txt="final_date"
        init={initial_date}
        final={final_date}
      />
    </div>
  );
};
