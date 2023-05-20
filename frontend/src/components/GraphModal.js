import React from "react";
import CandleChart from "./CandleChart";
import PieChart from "./PieChart";
import DashedChart from "./DashedChart";

export default (props) => {
  
  let totalPositivo;
  let totalNeutro;
  let totalNegativo;
  let porcentagemNegativo;
  let porcentagemNeutro;
  let porcentagemPositivo;
  let total;

  if(props && props.news){
    console.log(props.news)
    totalPositivo = props.news.sentiment_totals[2].quantity
    totalNeutro = props.news.sentiment_totals[1].quantity
    totalNegativo = props.news.sentiment_totals[0].quantity
    porcentagemPositivo = props.news.sentiment_totals[2].percentage
    porcentagemNeutro = props.news.sentiment_totals[1].percentage
    porcentagemNegativo = props.news.sentiment_totals[0].percentage
    total = props.news.total
  }

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
            <h1>{total} Notícias foram avaliadas</h1>
            {/* <p>Data inicial: {props.init}</p>
            <p>Data final: {props.final}</p> */}

            <div className="d-flex align-items-center justify-content-between">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <i className="fas fa-circle text-success m-2"></i>
                  <span className="lead">{porcentagemPositivo}% Positivas</span>
                  <p>{totalPositivo} notícias positivas</p>
                </div>
                <div>
                  <i className="fas fa-circle text-warning m-2"></i>
                  <span className="lead">{porcentagemNeutro}% Neutras</span>
                  <p>{totalNeutro} notícias neutras</p>
                </div>
                <div>
                  <i className="fas fa-circle text-danger m-2"></i>
                  <span className="lead">{porcentagemNegativo}% Negativas</span>
                  <p>{totalNegativo} notícias negativas</p>
                </div>
              </div>
              <div>
                <PieChart totalPositivo={totalPositivo} totalNegativo={totalNegativo} totalNeutro={totalNeutro}/>
              </div>
            </div>

            <DashedChart />
          </div>
        </div>
      </div>
    </div>
  );
};
