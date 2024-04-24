import React from "react";
import Routes from "./Routes";
import GlobalStyle from "../../frontendmind/src/styles/global";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes />
      <ToastContainer autoClose={3000} />
      <GlobalStyle />
    </>
  );
}

export default App;
