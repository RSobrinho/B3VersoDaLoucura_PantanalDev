import React from "react";
import GraphModal from "./GraphModal";
import SpaceOfTimeModal from "./SpaceOfTimeModal";
import NewsTable from "./NewsTable";
import useFetch from "./useFetch";
import getNews from "./getNews";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import env from "react-dotenv";

export default () => {
  return (
    <div className="text-center">
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

      <NewsTable />
      {/* <GraphModal title={data?.title} txt={data?.body} /> */}
    </div>
  );
};
