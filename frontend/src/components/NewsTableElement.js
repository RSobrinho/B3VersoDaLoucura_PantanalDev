import React from "react";
import getNews from "./getNews";
import env from "react-dotenv";

export default (element) => {
  return (
    <tr>
      <th className="text-truncate tb-column-max">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, non.
        Dolores, iusto reiciendis necessitatibus culpa voluptatibus quidem
        laborum unde amet in eveniet adipisci, voluptates similique molestiae.
        Vero impedit hic iusto?
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
  );
};
