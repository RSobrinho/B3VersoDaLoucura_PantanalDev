import React from "react";

export default () => {
  return (
    <React.Fragment>
      <div
        className="modal fade"
        id="modal-assessment"
        tabIndex="-1"
        aria-labelledby="modal-assessment"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5" id="title-modal-assessment">
                Avaliação da Notícia
              </h2>
            </div>
            <div className="modal-body row text-start">
              <div className="col-12">
                <label className="h4">Título</label>
                <p>Titulo importante para a noticia</p>
              </div>
              <div className="col-12">
                <label className="h4">Conteúdo</label>
                <p
                  id="content-file"
                  className="overflow-x-auto"
                  style={{ maxHeight: "15vw" }}
                >
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel
                  ducimus veritatis ipsum explicabo officiis fuga beatae eos,
                  ullam maiores dignissimos sequi tempore, quas cum? Quaerat
                  provident distinctio soluta tempora fugit. Lorem ipsum dolor
                  sit, amet consectetur adipisicing elit. Vel ducimus veritatis
                  ipsum explicabo officiis fuga beatae eos, ullam maiores
                  dignissimos sequi tempore, quas cum? Quaerat provident
                  distinctio soluta tempora fugit. Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Vel ducimus veritatis ipsum
                  explicabo officiis fuga beatae eos, ullam maiores dignissimos
                  sequi tempore, quas cum? Quaerat provident distinctio soluta
                  tempora fugit. Lorem ipsum dolor sit, amet consectetur
                  adipisicing elit. Vel ducimus veritatis ipsum explicabo
                  officiis fuga beatae eos, ullam maiores dignissimos sequi
                  tempore, quas cum? Quaerat provident distinctio soluta tempora
                  fugit. Lorem ipsum dolor sit, amet consectetur adipisicing
                  elit. Vel ducimus veritatis ipsum explicabo officiis fuga
                  beatae eos, ullam maiores dignissimos sequi tempore, quas cum?
                  Quaerat provident distinctio soluta tempora fugit. Quaerat
                  provident distinctio soluta tempora fugit. Lorem ipsum dolor
                  sit, amet consectetur adipisicing elit. Vel ducimus veritatis
                  ipsum explicabo officiis fuga beatae eos, ullam maiores
                  dignissimos sequi tempore, quas cum? Quaerat provident
                  distinctio soluta tempora fugit. Quaerat provident distinctio
                  soluta tempora fugit. Lorem ipsum dolor sit, amet consectetur
                  adipisicing elit. Vel ducimus veritatis ipsum explicabo
                  officiis fuga beatae eos, ullam maiores dignissimos sequi
                  tempore, quas cum? Quaerat provident distinctio soluta tempora
                  fugit. Quaerat provident distinctio soluta tempora fugit.
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel
                  ducimus veritatis ipsum explicabo officiis fuga beatae eos,
                  ullam maiores dignissimos sequi tempore, quas cum? Quaerat
                  provident distinctio soluta tempora fugit. Quaerat provident
                  distinctio soluta tempora fugit. Lorem ipsum dolor sit, amet
                  consectetur adipisicing elit. Vel ducimus veritatis ipsum
                  explicabo officiis fuga beatae eos, ullam maiores dignissimos
                  sequi tempore, quas cum? Quaerat provident distinctio soluta
                  tempora fugit. Quaerat provident distinctio soluta tempora
                  fugit. Lorem ipsum dolor sit, amet consectetur adipisicing
                  elit. Vel ducimus veritatis ipsum explicabo officiis fuga
                  beatae eos, ullam maiores dignissimos sequi tempore, quas cum?
                  Quaerat provident distinctio soluta tempora fugit.
                </p>
              </div>
              <div className="col-12 h4 d-flex align-items-center gap-3">
                <label>
                  Data notícia:
                  <span className="fw-normal">01/05/2023</span>
                </label>
                <label>
                  Data avaliação:
                  <span className="fw-normal">01/05/2023</span>
                </label>
              </div>
              <div className="col-12">
                <label className="h4">Impacto</label>
                <div className="d-flex gap-2 align-items-center">
                  <a
                    href="#"
                    className="text-decoration-none h5 fw-medium text-dark"
                  >
                    <i className="fas fa-circle text-success"></i>
                    <span>50% Positivo</span>
                  </a>
                  <a
                    href="#"
                    className="text-decoration-none h5 fw-medium text-dark"
                  >
                    <i className="fas fa-circle text-danger"></i>
                    <span>10% Negativo</span>
                  </a>
                  <a
                    href="#"
                    className="text-decoration-none h5 fw-medium text-dark"
                  >
                    <i className="fas fa-circle text-warning"></i>
                    <span>5% Neutro</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="modal-footer d-flex align-items-center justify-content-between">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Fechar
              </button>
              <a href="#" className="btn btn-outline-primary" target="_blank">
                Acessar noticia <i className="fad fa-link"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
