import React from "react";

export default () => {
  return (
    <React.Fragment>
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
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
              />
              <button
                type="button"
                className="input-group-text border-0 bg-transparent"
                data-bs-toggle="modal"
                data-bs-target="#modal-assessment"
              >
                <i className="fas fa-search text-default"></i>
              </button>
            </div>
          </div>
        </form>
        <p className="lead">Últimas avaliações</p>
        <p className="lead d-flex gap-3 justify-content-center">
          <a
            href="assessment.html"
            className="text-decoration-none h3 fw-light text-dark"
          >
            <i className="fas fa-circle text-success"></i>
            <span>50</span>
          </a>
          <a
            href="assessment.html"
            className="text-decoration-none h3 fw-light text-dark"
          >
            <i className="fas fa-circle text-danger"></i>
            <span>10</span>
          </a>
          <a
            href="assessment.html"
            className="text-decoration-none h3 fw-light text-dark"
          >
            <i className="fas fa-circle text-warning"></i>
            <span>5</span>
          </a>
        </p>
      </div>
    </React.Fragment>
  );
};
