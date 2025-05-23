import React, { useState } from "react";
import Evaluation from "./Evaluation";
import Header from "./Header";
import Search from "./Search";
import SpaceOfTimeModal from "./SpaceOfTimeModal";
import "../public/fontawesome/css/all.css";
import NewsModal from "./NewsModal";
import NewsModalScraping from "./NewsModalScraping";

function Main(props) {
  const [page, setPage] = useState(props.page);

  // Data share variable
  const [res, setRes] = useState(null);

  function configurePage(page) {
    switch (page) {
      case 1:
        return <Evaluation res={res} modRes={(data) => setRes(data)} />;

      default:
        return <Search />;
    }
  }

  return (
    <>
      <Header switch={(num) => setPage(num)} />

      <SpaceOfTimeModal
        modRes={(data) => setRes(data)}
        switch={(num) => setPage(num)}
      />
      <NewsModal />
      <NewsModalScraping />

      <main className="px-3 h-100">{configurePage(page)}</main>
    </>
  );
}

export default Main;
