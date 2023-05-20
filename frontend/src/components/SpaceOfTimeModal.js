import React, { useState } from "react";
import axios from "axios";
import { AlertSweet, AlertLoading } from "./AlertSweet";

const baseURL = `${process.env.REACT_APP_URL_BACK}/api/v1`;

const TempModal = (props) => {
  let [startDate, setStartDate] = useState("");
  let [endDate, setEndDate] = useState("");
  let dateNow = new Date();
  dateNow = dateNow.toISOString().slice(0, 10);

  async function createPost(init, final) {
    let url = `${baseURL}/scraping`;
    const response = await axios.post(`${baseURL}/scraping`, {
      initial_date: init,
      final_date: final,
    });
    return response.data;
  }

  async function toPost() {
    const init = document.getElementById("in-initial-date").value;
    const final = document.getElementById("in-final-date").value;

    let initial_dt = new Date(init);
    let final_dt = new Date(final);

    if (initial_dt > final_dt) {
      AlertSweet("Data inicial não pode ser maior que a final!");
      return null;
    } else if (final_dt > new Date()) {
      AlertSweet("Data final não pode sair maior que a data de hoje!");
      return null;
    }

    AlertLoading(
      "Realizando a busca e avaliação das notícias, por favor aguarde!",
      "Avalições das noticías feitas com sucesso!",
      "success",
      5500
    );

    if (init.toString().length >= 10 && final.toString().length >= 10) {
      startDate = init;
      endDate = final;
      const res = await createPost(init, final);
      props.modRes(res);
      return res;
    }

    return null;
  }

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleButtonClick = async () => {
    toPost()
      .then((res) => {
        if (res) {
          props.switch(1);
          location.href =
            "#assessments?initial_date=" +
            startDate.toString() +
            "&final_date=" +
            endDate.toString();
        }
      })
      .catch((err) => {
        if (err?.response?.data?.error?.message) {
          AlertSweet(err?.response?.data?.error?.message);
        } else {
          AlertSweet("Houve um erro ao solicitar a busca das notícias!");
        }
        return null;
      });
  };

  return (
    <React.Fragment>
      <div
        className="modal fade"
        id="temp-modal"
        tabIndex="-1"
        aria-labelledby="temp-modal time"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5" id="temp-modal">
                Selecione um Intervalo de Tempo
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body row text-start">
              <div className="col-12 text-center">
                <label className="h4">Como Fazer</label>
                <p>
                  Escolha uma data inicial, depois escolha uma data final e
                  clique no botão "Avaliar Notícias", e serão buscadas e
                  avaliadas todas as notícias relacionadas B3 nesse período
                  especificado.
                </p>
              </div>

              <div className="col-12 col-md-6 my-2">
                <label className="h4">Data Inicial</label>
                <input
                  id="in-initial-date"
                  type="date"
                  className="form-control"
                  value={startDate || dateNow}
                  onChange={handleStartDateChange}
                />
              </div>

              <div className="col-12 col-md-6 my-2">
                <label className="h4">Data Final</label>
                <input
                  id="in-final-date"
                  type="date"
                  className="form-control"
                  value={endDate || dateNow}
                  onChange={handleEndDateChange}
                />
              </div>

              <div className="col-12 text-center">
                <button
                  className="btn btn-primary my-3"
                  onClick={handleButtonClick}
                  data-bs-dismiss="modal"
                >
                  Avaliar Notícias &nbsp;
                  <i className="far fa-search text-default"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TempModal;
