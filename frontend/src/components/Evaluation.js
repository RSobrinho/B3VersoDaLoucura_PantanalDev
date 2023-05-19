import React from "react";
import GraphModal from "./GraphModal";
import SpaceOfTimeModal from "./SpaceOfTimeModal";
import useFetch from "./useFetch";
import getNews from "./getNews";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import env from "react-dotenv";

export default () => {
  const url = `${env.URL_BACK}:${env.PORT_BACK}/api/v1/news`;

  if (url) {
    const { data, loading, error } = getNews(url);

    if (loading) {
      return (
        <h1>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </h1>
      );
    }
    if (error) console.log(error);
  }

  return (
    <div className="text-start">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="fw-normal h2">Avaliações</h1>
        <div className="d-flex align-items-center justify-content-center gap-2 h5 fw-italic">
          <div className="d-flex gap-1 align-items-center">
            <span>Inicio: </span>
            <input type="date" className="form-control" />
          </div>

          <div className="d-flex gap-1 align-items-center">
            <span>Fim: </span>
            <input type="date" className="form-control" />
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

          {/* <div className="dropdown">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              aria-expanded="false"
            >
              <i className="fal fa-filter"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item active" data-filter="0" href="#">
                  Todos
                </a>
              </li>
              <li>
                <a className="dropdown-item" data-filter="1" href="#">
                  <i className="fas fa-circle text-success"></i> Positivo
                </a>
              </li>
              <li>
                <a className="dropdown-item" data-filter="2" href="#">
                  <i className="fas fa-circle text-danger"></i> Negativo
                </a>
              </li>
              <li>
                <a className="dropdown-item" data-filter="3" href="#">
                  <i className="fas fa-circle text-warning"></i> Neutro
                </a>
              </li>
            </ul>
          </div> */}

          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#temp-modal"
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

      <div className="table-responsive tb-default py-2">
        <table className="table table-striped align-middle">
          <tbody>
            <tr>
              <th className="text-truncate tb-column-max">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,
                non. Dolores, iusto reiciendis necessitatibus culpa voluptatibus
                quidem laborum unde amet in eveniet adipisci, voluptates
                similique molestiae. Vero impedit hic iusto?
              </th>
              <td className="text-end">
                <a
                  href="#"
                  className="text-dark fst-italic h5"
                  data-bs-toggle="modal"
                  data-bs-target="#news-modal"
                >
                  Acessar
                </a>
              </td>
              <td className="h3" style={{ width: "1rem" }}>
                <i className="fas fa-circle text-success"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* <GraphModal title={data?.title} txt={data?.body} /> */}
    </div>
  );
};
