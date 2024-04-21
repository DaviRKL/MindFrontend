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

interface User {
    id: number;
    name: string;
    email: string;
    
  }
const Grid = ({users}: {users: User[]}) => {
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Email</Th>
                    <Th>Fone</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.map((item: any, i:number) => (
                    <Tr key ={i}>
                        <Td width="30%">{item.Nome}</Td>
                        <Td width="30%">{item.Email}</Td>
                        <Td width="20%">{item.fone}</Td>
                        <Td  width="5%">
                            <FaEdit />
                        </Td>
                        <Td width="5%">
                            <FaTrash  />
                            {/* onClick={() => handleDelete(item.id)} */}
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;