import React, { useState } from "react";
import Evaluation from "./Evaluation";
import Header from "./Header";
import Search from "./Search";
import { getPage } from "./page";
import SpaceOfTimeModal from "./SpaceOfTimeModal"
import "../public/fontawesome/css/all.css";

function Main(props) {
  const [page, setPage] = useState(props.page);

  function configurePage(page) {
    switch (page) {
      case 1:
        return <Evaluation />;

      default:
        return <Search />;
    }
  }

  return (
    <>
      <Header switch={(num) => setPage(num)} />

      <SpaceOfTimeModal switch={(num) => setPage(num)}/>

      <main className="px-3 h-100">{configurePage(page)}</main>
    </>

  );
}

export default Main;
