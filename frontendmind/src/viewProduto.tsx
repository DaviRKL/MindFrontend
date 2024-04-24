import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const ViewProduto = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState<any>(null);
  const [imagemUrl, setImagemUrl] = useState<any>("");

  const getProduto = async () => {
    try {
      const res = await axios.get(`http://localhost:8900/viewProduto/${id}`);
      setProduto(res.data[0]);
    } catch (error) {
      toast.error(error);
    }
  };

  const getImagem = async () => {
    try {
      const imagemRes = await axios.get(`http://localhost:8900/imagens/${produto.Imagem}`);
      setImagemUrl(imagemRes.config.url); // Armazenando a URL da imagem
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getProduto();
  }, [id]);

  useEffect(() => {
    if (produto) {
      getImagem();
    }
  }, [produto]);

  return (
    <div>
      {produto && (
        <div>
          <h2>Detalhes do Produto</h2>
          <p>ID: {produto.id}</p>
          <p>Nome: {produto.Nome}</p>
          <p>Descrição: {produto.Descricao}</p>
          <p>Quantidade: {produto.Qtd}</p>
          <p>Valor: {produto.Valor}</p>
          <p>Imagem</p>
          <img src={imagemUrl} />
        </div>
      )}
    </div>
  );
};

export default ViewProduto;
