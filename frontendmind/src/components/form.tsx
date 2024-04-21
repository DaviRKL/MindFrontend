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

const Form = ({ onEdit, setOnEdit, getUsers}:any) => {
    const ref = useRef();
    useEffect(() => {
        if (onEdit){
            const user: any  = ref.current;
    
            user.Nome.value = onEdit.Nome;
            user.Email.value = onEdit.Email;
            user.Senha.value = onEdit.Senha;
        
        }
    }, [onEdit]);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const user: any  = ref.current;
        if ( !user.Nome.value  ||  !user.Email.value || !user.Senha.value) {
            return toast.warn("Preencha todos os campos!");
        }

        if (onEdit) {
            await axios
            .put("http://localhost:8900/" + onEdit.id, {
               Nome: user.Nome.value,
               Email: user.Email.value, 
               Senha: user.Senha.value 
            })
            .then(({data}) =>toast.success(data))
            .catch(({data}) =>toast.error(data));
        }

        else {
            await axios
            .post("http://localhost:8900",{
                Nome: user.Nome.value ,
                Email: user.Email.value,
                Senha: user.Senha.value
            })
            .then(({data}) =>toast.success(data))
            .catch(({data}) =>toast.error(data));
        }
        user.Nome.value = "";
        user.Email.value =  "";
        user.Senha.value =  "";

        setOnEdit(null);
        getUsers();
    };
   
    
    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
            <Label>Nome</Label>
            <Input name = "Nome"/>
            </InputArea>
            <InputArea>
            <Label>Email</Label>
            <Input name="Email" type="Email"/>
            </InputArea>
            <InputArea>
            <Label>Senha</Label>
            <Input name="Senha" type="password"/>
            </InputArea>
            <Button type="submit">SALVAR</Button>
      </FormContainer>
    );
}

export default Form;



