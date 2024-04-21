import React from "react";
import styled from "styled-components";
import axios from "axios";
import {FaTrash, FaEdit } from "react-icons/fa";
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

const Grid = ({users, setUsers, setOnEdit}: any) => {

    const handleEdit = (item: any) => {
        setOnEdit(item);
    };

    const handleDelete = async (id: any) => {
        await axios
        .delete("http://localhost:8900/" + id)
        .then(({data}) => {
            const newArray: any = users.filter((user:any)=> user.id !== id);

            setUsers(newArray);
            toast.success(data);
        })
        .catch(({data}) => toast.error(data));

     setOnEdit(null);

    }

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Email</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.map((item: any, i:number) => (
                    <Tr key ={i}>
                        <Td width="40%">{item.Nome}</Td>
                        <Td width="40%">{item.Email}</Td>
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