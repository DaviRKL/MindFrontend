import React from "react";
import styled from "styled-components";
import { useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";



 const FormContainer = styled.form`
    display:flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;
 
 const InputArea = styled.div`
    display:flex;
    flex-direction: column;
`;
 const Input = styled.input`
    width:120px;
    padding: 0 10px;
    border 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;
 const Label = styled.label``;

 const Button = styled.button`
    padding: 10px;
    cursor:pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

const Form = ({ onEdit, setOnEdit, getProdutos}:any) => {
    const ref = useRef();
    useEffect(() => {
        if (onEdit){
            const produto: any = ref.current;
            produto.Nome.value = onEdit.Nome;
            produto.Descricao.value = onEdit.Descricao;
            produto.Valor.value = onEdit.Valor;
            produto.Qtd.value = onEdit.Qtd;
        
        }
    }, [onEdit]);
    
    const handleSubmit = async (e: any) => {
        const produto: any  = ref.current;
        e.preventDefault();
        const formData = new FormData();
        formData.append("Nome", produto.Nome.value);
        formData.append("Descricao", produto.Descricao.value);
        formData.append("Valor", produto.Valor.value);
        formData.append("Qtd", produto.Qtd.value);
        formData.append("Imagem", produto.Imagem.files[0]);
    
        try {
            if (!formData.get("Nome") || !formData.get("Descricao") || !formData.get("Valor") || !formData.get("Qtd") || !formData.get("Imagem")) {
                return toast.warn("Preencha todos os campos!");
            }
    
            if (onEdit) {
                await axios.put(`http://localhost:8900/${onEdit.id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
            } else {
                await axios.post("http://localhost:8900", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
            }
    
            toast.success("Produto salvo com sucesso");
            setOnEdit(null);
            getProdutos();
        } catch (error) {
            toast.error("Erro ao salvar o produto");
        }
    };
    
   
    
    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
            <Label>Nome</Label>
            <Input name = "Nome"/>
            </InputArea>
            <InputArea>
            <Label>Descrição</Label>
            <Input name="Descricao"/>
            </InputArea>
            <InputArea>
            <Label>Quantidade</Label>
            <Input name="Qtd" type="number"/>
            </InputArea>
            <InputArea>
            <Label>Valor</Label>
            <Input name="Valor" type="number"/>
            </InputArea>
            <InputArea>
            <Label>Imagem</Label>
            <Input name="Imagem" type="file"/>
            </InputArea>
            <Button type="submit">SALVAR</Button>
      </FormContainer>
    );
}

export default Form;



