import React, { useState } from "react";
import { alterPage } from "./page";

const TempModal = (props) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = React.useState(props.page);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleButtonClick = () => {
    // Perform any desired action with the selected dates
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
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
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
              </div>
              
              <div className="col-12">
                <label className="h4">Data Final</label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </div>

              <div className="col-12 text-center">
                <button
                  className="btn btn-primary my-3"
                  onClick={() => props.switch(1)}
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
