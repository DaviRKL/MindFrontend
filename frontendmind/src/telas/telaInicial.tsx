import GlobalStyle from "../../../frontendmind/src/styles/global";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "../components/form";
import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "../components/grid";
import { BrowserRouter as Router, Route} from "react-router-dom";

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  `;

  const Title = styled.h2``;
 
 

function TelaInicial() {
  
  const [produtos, setProdutos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getProdutos = async () => {
    try {
      const res = await axios.get("http://localhost:8900/");
      setProdutos(res.data.sort((a:any, b:any) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getProdutos();
  }, []);

  return (
    <>
      <Container>
        <Title>PRODUTOS</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getProdutos={getProdutos} />
        <Grid produtos={produtos} setProdutos={setProdutos} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} />
      <GlobalStyle />
    </>
  );
}

export default TelaInicial;
