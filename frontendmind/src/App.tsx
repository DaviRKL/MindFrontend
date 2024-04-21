import GlobalStyle from "../../frontendmind/src/styles/global";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "./components/form";
import Grid from "./components/grid";
import { useState, useEffect } from "react";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  `;

  const Title = styled.h2``;
 
  

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8900");
      setUsers(res.data.sort((a: any, b: any) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Container>
        <Title>USUÁRIOS</Title>
        <Form />
        <Grid users={users} />
      </Container>
      <ToastContainer autoClose={3000} />
      <GlobalStyle />
    </>

  );
}

export default App;
