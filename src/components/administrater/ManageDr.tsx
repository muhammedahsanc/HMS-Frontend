import React, { useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import axios from "../../config/axios";
import styled from 'styled-components';
import { StaffDataProps } from '../../interfaces';

interface DoctorData {
  staff_id: string;
  name: string;
  username: string;
  password: string;
  category_name: string;
  qualification: string;
  status: string;
}

const Styles = styled.div`
  padding: 1rem;
  margin-right: 9rem;

  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    white-space: nowrap; // Prevent line breaks in cells

    th,
    td {
      margin: 0;
      padding: 1rem;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      text-align: left; // Align text to the left

      @media (max-width: 768px) {
        display: block;
        width: 100%;
        box-sizing: border-box;

        :last-child {
          border-right: 0;
        }
      }
    }

    th {
      background-color: #0b9c67;
      color: #fff;
    }

    td {
      background-color: #f7f7f7;
    }

    :last-child {
      border-right: 0;
    }
  }
`;

const ManageDr: React.FC = () => {
  const [staffList, setStaffList] = React.useState<StaffDataProps[]>([]);

  const getAdministrator = async (): Promise<void> => {
    try {
      const response = await axios.get("/administrater/getStaff");
      console.log(response.data.data);
      setStaffList(response.data.data);
    } catch (error) {
      console.error("Error fetching administrator data:", (error as Error).message);
    }
  };

  useEffect(() => {
    getAdministrator();
  }, []);

  const data = useMemo(() => staffList, [staffList]);

  const columns = useMemo(
    () => [
      { Header: 'Staff ID', accessor: 'staff_id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Username', accessor: 'username' },
      { Header: 'Password', accessor: 'password' },
      { Header: 'Category Name', accessor: 'category_name' },
      { Header: 'Qualification', accessor: 'qualification' },
      { Header: 'Status', accessor: 'status' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<DoctorData>({ columns, data });

  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Styles>
  );
};

export default ManageDr;
