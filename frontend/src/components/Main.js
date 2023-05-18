import React, {useState} from "react";
import Evaluation from "./Evaluation";
import Header from "./Header";
import Search from "./Search";
import "../public/fontawesome/css/all.css";

function Main(props) {
  const [page, setPage] = useState(props.page)

  return (
    <>
      <Header switch={num => setPage(num)}/>
      
      <main className="px-3 h-100">
        {page ? <Search /> : <Evaluation />}
      </main>
    </>
  );
}

export default Main;
