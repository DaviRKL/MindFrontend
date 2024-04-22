import React from "react";
import styled from "styled-components";
import axios from "axios";
import {FaTrash, FaEdit, FaEye } from "react-icons/fa";
import {toast} from "react-toastify";


const Table = styled.table`\
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;
`
export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Img = styled.img``;

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;

    
`;

export const Td = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")}; 
`;

const Grid = ({produtos, setProdutos, setOnEdit}: any) => {

    const handleEdit = (item: any) => {
        setOnEdit(item);
    };

    const handleDelete = async (id: any) => {
        await axios
        .delete("http://localhost:8900/" + id)
        .then(({data}) => {
            const newArray: any = produtos.filter((user:any)=> user.id !== id);
            setProdutos(newArray);
            toast.success(data);
        })
        .catch(({data}) => toast.error(data));

     setOnEdit(null);

    }

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th width="30%"></Th>
                    <Th width="5%">ID</Th>
                    <Th width="40%">Nome</Th>
                    <Th width="10%">QTD</Th>
                    <Th width="5%"></Th>
                    <Th width="5%"></Th>
                    <Th width="5%"></Th>
                </Tr>
            </Thead>
            <Tbody>
                {produtos.map((item: any, i:number) => (
                    <Tr key ={i}>
                        <Td width="30%"><Img src={"http://localhost:8900/imagens/" + item.Imagem}></Img></Td>
                        <Td width="5%">{item.id}</Td>
                        <Td width="40%">{item.Nome}</Td>
                        <Td width="10%">{item.Qtd}</Td>
                        <Td width="5%">
                            <div onClick={() => handleEdit(item.id)} >
                                <FaEye />
                            </div>   
                        </Td>
                        <Td  width="5%">
                            <div onClick={() => handleEdit(item)}>
                                <FaEdit />
                            </div>  
                        </Td>
                        <Td width="5%">
                            <div onClick={() => handleDelete(item.id)} >
                                <FaTrash/>
                            </div>   
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;