import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MenuPage from "./pages/MenuPage/MenuPage";
import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="app">
        <Route exact path="/" component={HomePage} />
        <Route exact path="/menu" component={MenuPage} />
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
