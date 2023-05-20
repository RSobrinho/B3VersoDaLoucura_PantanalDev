import React from "react";
import getNews from "./getNews";
import env from "react-dotenv";

export default (props) => {
  const [news, setNews] = React.useState(props.data);
  const limit = 33.33;
  let color = "warning";

  if (news?.sentiment?.positive > limit) {
    color = "success";
  } else if (news?.sentiment?.negative > limit) {
    color = "danger";
  }

  return (
    <tr>
      <th className="text-truncate tb-column-max text-start">{news?.title}</th>
      <td className="h5 text-end">{news?.date.slice(0, 10)}</td>
      <td className="text-end">
        <a
          href="#"
          className="text-dark fst-italic h5"
          data-bs-toggle="modal"
          data-bs-target="#news-modal"
          data-title={news?.title}
          data-content={news?.description}
          data-dt-news={news?.date}
          data-url={news?.link}
          data-color={color}
        >
          Acessar
        </a>
      </td>
      <td className="h3" style={{ width: "1rem" }}>
        <i className={`fas fa-circle text-${color}`}></i>
      </td>
    </tr>
  );
};
