import React, { useState } from "react";
import axios from "axios";

const baseURL = `${process.env.REACT_APP_URL_BACK}/api/v1`;

const TempModal = (props) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  async function createPost(init, final) {
    let url = `${baseURL}/scraping`;
    console.log(url);
    const response = await axios.post(`${baseURL}/scraping`, {
      initial_date: init,
      final_date: final,
    });
    return response.data;
  }

  async function toPost() {
    const init = document.getElementById("in-initial-date").value;
    const final = document.getElementById("in-final-date").value;

    const res = await createPost(init, final);
    props.modRes(res);
  }

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleButtonClick = () => {
    toPost();
    props.switch(1);
    location.href =
      "#assessments?initial_date=" +
      startDate.toString() +
      "&final_date=" +
      endDate.toString();
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
              <div className="col-12">
                <label className="h4">Como fazer</label>
                <p>
                  Escolha uma data inicial, depois escolha uma data final e
                  clique no botão "Adquirir Notícias".
                </p>
              </div>

              <div className="col-12">
                <label className="h4">Data Inicial</label>
                <input
                  id="in-initial-date"
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
              </div>

              <div className="col-12">
                <label className="h4">Data Final</label>
                <input
                  id="in-final-date"
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </div>

              <div className="col-12 text-center">
                <button
                  className="btn btn-primary my-3"
                  onClick={handleButtonClick}
                  data-bs-dismiss="modal"
                >
                  Adquirir Notícias
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
