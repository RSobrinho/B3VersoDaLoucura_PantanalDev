import React from "react";
import getNews from "./getNews";
import env from "react-dotenv";

export default () => {
  const url = `${env.URL_BACK}:${env.PORT_BACK}/api/v1/news`;

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
  }

  return (
    <div className="table-responsive tb-default py-2">
      <table className="table table-striped align-middle">
        <tbody></tbody>
      </table>
    </div>
  );
};
