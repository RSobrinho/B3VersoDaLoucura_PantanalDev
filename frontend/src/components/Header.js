import React from "react";
import img from "../public/logo-b3.png";

export default (props) => {
  return (
    <React.Fragment>
      <header>
        <nav className="navbar navbar-expand-md navbar-light">
          <div className="container-fluid">
            <a
              className="navbar-brand d-flex align-items-end"
              href=""
            >
              <img
                className=""
                src={img}
                alt="logo b3"
                width="50"
                height="50"
              />
              <span className="fw-bold h3" style={{ color: "#08377b" }}>
                Verso
              </span>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar-collapse"
              aria-controls="navbar-collapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0 h5 fw-normal">
                <li className="nav-item">
                  <a
                    href="#main"
                    className="nav-link text-default page-link"
                    aria-current="page"
                    onClick={() => props.switch(0)}
                  >
                    Buscar
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="#assessments"
                    className="nav-link text-default page-link"
                    aria-current="page"
                    onClick={() => props.switch(1)}
                  >
                    Avaliações
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
};
