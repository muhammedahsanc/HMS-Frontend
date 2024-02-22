import React, { useState, useMemo, FormEvent, useEffect } from "react";
import styled from "styled-components";
import { useTable } from "react-table";
import axios from "../../config/axios";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AdministraterDataProps } from "../../interfaces";

import createAdministrater from "../administrater/createAdministrater";

const Container = styled.div`
  padding: 20px;
  font-family: "Arial", sans-serif;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-bottom: 20px;

  label {
    margin-bottom: 8px;
    font-weight: bold;
  }

  input {
    padding: 10px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }

select{
  width:232%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}
`
;


const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
    font-size: 14px;
  }

  th {
    background-color: #f2f2f2;
  }
`;

interface StaffMember {
  id: number;
  name: string;
  role: string;
  username?: string;
  password?: string;
}

const staffMembers: StaffMember[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Staff",
    username: "john.doe",
    password: "password1",
  },
  {
    id: 2,
    name: "Jane Doe",
    role: "Staff",
    username: "jane.doe",
    password: "password2",
  },
];

const AdminDashboard: React.FC = () => {
  const [administraterData, setadministraterData] =
    React.useState<AdministraterDataProps>({
      name: "",
      username: "",
      password: "",
      role: "",
    });
    const [staffList, setStaffList] = React.useState<AdministraterDataProps[]>([]);
  const handleAdminCreate = async () => {
    const data = await createAdministrater(administraterData);
    console.log(administraterData);
  };

  const getAdministrator = async (): Promise<void> => {
      try {
          const response = await axios.get("admin/getAdministrater");
         
          // const ids: string[] = response.data.data.map((item: { _id: string }) => item);
          console.log(response.data.data);
          setStaffList(response.data.data)
      } catch (error) {
          console.error("Error fetching administrator data:", (error as Error).message);
      }
  };
  useEffect(() => {
  getAdministrator(); 
}, []);
const handleEdit =(id:any)=>{

}
const handleDelete =(id:any)=>{

}

  const data = useMemo(() => staffList, [staffList]);
  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Name", accessor: "name" },
      { Header: "Role", accessor: "role" },
      { Header: "Username", accessor: "username" },
      { Header: "Password", accessor: "password" },

    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <Container>
      <Section>
        <h2>Create Administrator</h2>
        <Form onSubmit={handleAdminCreate}>
          <TwoColumnGrid>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={administraterData.name}
                onChange={(e) =>
                  setadministraterData({
                    ...administraterData,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label>Role:</label>
              <select
                value={administraterData.role}
                onChange={(e) =>
                  setadministraterData({
                    ...administraterData,
                    role: e.target.value,
                  })
                }
                required
              >
                <option value="">Select Role</option>
                <option value="Doctor-Administrater">Doctor-Administrater</option>
                <option value="Pharmacy-Administrater">Pharmacy-Administrater</option>
                <option value="Lab-Administrater">Lab-Administrater</option>
              </select>
            </div>
          </TwoColumnGrid>
          <TwoColumnGrid>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={administraterData.username}
                onChange={(e) =>
                  setadministraterData({
                    ...administraterData,
                    username: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={administraterData.password}
                onChange={(e) =>
                  setadministraterData({
                    ...administraterData,
                    password: e.target.value,
                  })
                }
                required
              />
            </div>
          </TwoColumnGrid>
          <Button type="submit">Create Administrator</Button>
        </Form>
      </Section>

      <Section>
        <h2>All Staff Members</h2>
        <Table {...getTableProps()}>
  <thead>
    {headerGroups.map((headerGroup: any) => (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column: any, columnIndex: number) => (
          <th {...column.getHeaderProps()}>
            {columnIndex === 0 ? null : column.render("Header")}
          </th>
        ))}
         {/* <th>Edit</th> */}
        <th>Status</th> 
      </tr>
    ))}
  </thead>
  <tbody {...getTableBodyProps()}>
    {rows.map((row: any, rowIndex: number) => {
      prepareRow(row);
      return (
        <tr {...row.getRowProps()}>
          {row.cells.map((cell: any, cellIndex: number) => (
            <td {...cell.getCellProps()}>
              {cellIndex === 0 ? rowIndex + 1 : cell.render("Cell")}
            </td>
          ))}
          {/* Add cells with edit and delete icons for the last column */}
          <td>
            <FaEdit onClick={() => handleEdit(row.original.id)} />
          
            <FaTrash onClick={() => handleDelete(row.original.id)} />
          </td>
        </tr>
      );
    })}
  </tbody>
</Table>



        {/* <Table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row: any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table> */}
      </Section>
    </Container>
  );
};

export default AdminDashboard;
