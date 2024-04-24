import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Use Routes diretamente
import TelaInicial from "./telas/telaInicial";
import  ViewProduto from "./viewProduto";

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/viewProduto/:id" element={<ViewProduto />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
