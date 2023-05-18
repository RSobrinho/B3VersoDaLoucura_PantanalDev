import React from "react";
import GraphModal from "./GraphModal";
import useFetch from "./useFetch";

export default () => {
  const { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/posts/2");
  if (loading) return <h1>Carregando...</h1>
  if (error) console.log(error);

  return (
    <div className="text-start">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="fw-normal h2">Avaliações</h1>
        <div className="d-flex align-items-center justify-content-between gap-3">

          <GraphModal title={data?.title} txt={data?.body} />

          {/* Button trigger modal */}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#graphModal"
          >
            Ver estatísticas...
          </button>

          <div className="dropdown">
            <a
              href="#"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              aria-expanded="false"
              className="text-decoration-none text-dark fw-medium"
            >
              Filtro
              <i className="fal fa-filter"></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item active" data-filter="0" href="#">
                  Todas Avaliações
                </a>
              </li>
              <li>
                <a className="dropdown-item" data-filter="1" href="#">
                  Avaliações de hoje
                </a>
              </li>
              <li>
                <a className="dropdown-item" data-filter="2" href="#">
                  Minhas Avaliações
                </a>
              </li>
            </ul>
          </div>

          <div className="dropdown">
            <a
              href="#"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              aria-expanded="false"
              className="text-decoration-none text-dark fw-medium"
            >
              Impacto
              <i className="fad fa-circle"></i>
            </a>
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
          </div>
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
                  data-bs-target="#modal-assessment"
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
    </div>
  );
};
