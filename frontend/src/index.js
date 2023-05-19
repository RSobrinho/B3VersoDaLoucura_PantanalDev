import React from "react";
import ReactDOM from "react-dom/client";
import "./public/css/index.css";
import reportWebVitals from "./reportWebVitals";
import Main from "./components/Main";
import Footer from "./components/Footer";
import NewsModal from "./components/NewsModal";
import SpaceOfTimeModal from "./components/SpaceOfTimeModal";
import { getPage } from "./components/page";

const root = ReactDOM.createRoot(document.getElementById("root"));
const pg = getPage();

root.render(
  <React.StrictMode>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <Main page={pg} />
    <NewsModal />
    <Footer />
    <SpaceOfTimeModal />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
