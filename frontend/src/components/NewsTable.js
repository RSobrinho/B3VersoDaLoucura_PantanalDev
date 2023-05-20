import React from "react";
import getNews from "./getNews";
import NewsTableElement from "./NewsTableElement";
import env from "react-dotenv";

export default (props) => {
  let [dates, setNews] = React.useState(props.data);

  let url;
  let nw;

  if (dates && dates.initial_date && dates.final_date) {
    url = `${env.URL_BACK}:${env.PORT_BACK}/api/v1/news?initial_date=${dates.initial_date}&final_date=${dates.final_date}`;
  }

  if (url) {
    const { data, loading, error } = getNews(url);
    if (loading) {
      return (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      );
    }
    if (error) console.log(error);

    nw = data && data.news ? data.news : null;

    if ((nw && nw.length == 0) || !nw) {
      return (
        <div className="w-100 d-flex align-items-center justify-content-center">
          <p className="text-center h5">Sem Notícias</p>
        </div>
      );
    }
  }

  if (!nw) {
    return (
      <div className="w-100 d-flex align-items-center justify-content-center">
        <p className="text-center h5">
          Escolha as datas e consulte as avaliações das notícias!
        </p>
      </div>
    );
  }

  return (
    <table className="table table-striped align-middle">
      <tbody>
        {nw.map((value, key) => (
          <NewsTableElement key={key} data={value} />
        ))}
      </tbody>
    </table>
  );
};
