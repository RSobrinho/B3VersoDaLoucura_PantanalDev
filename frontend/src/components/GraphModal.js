import React from "react";
import CandleChart from "./CandleChart";
import PieChart from "./PieChart";
import DashedChart from "./DashedChart";

export default (props) => {
  return (
    <div
      className="modal fade"
      id="graphModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <h1>XXXX Notícias foram avaliadas</h1>
            <p>Data inicial: {props.init}</p>
            <p>Data final: {props.final}</p>

            <div className="d-flex align-items-center justify-content-between">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <i className="fas fa-circle text-success m-2"></i>
                  <span className="lead">61.4% Positivas</span>
                  <p>700 notícias positivas</p>
                </div>
                <div>
                  <i className="fas fa-circle text-warning m-2"></i>
                  <span className="lead">12.3% Neutras</span>
                  <p>140 notícias positivas</p>
                </div>
                <div>
                  <i className="fas fa-circle text-danger m-2"></i>
                  <span className="lead">26.3% Negativas</span>
                  <p>300 notícias positivas</p>
                </div>
              </div>
              <div>
                <PieChart />
              </div>
            </div>

            <DashedChart />
          </div>
        </div>
      </div>
    </div>
  );
};
