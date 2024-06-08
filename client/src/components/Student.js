import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';

const StudentsTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching users...');
        const response = await axios.get('http://localhost:5000/api/user/getAllUsers');
        console.log('Data fetched:', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs once on mount

  const columns = React.useMemo(() => [
    {
      Header: 'Student Name',
      accessor: 'name',
    },
    {
      Header: 'Reg No',
      accessor: 'registrationNo',
    },
    {
      Header: 'Accept',
      accessor: 'accept',
      Cell: ({ row }) => (
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => handleAccept(row.original)}
        >
          Going out
        </button>
      ),
    },
    {
      Header: 'Reject',
      accessor: 'reject',
      Cell: ({ row }) => (
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => handleReject(row.original)}
        >
          Coming in
        </button>
      ),
    },
  ], []); // Empty dependency array ensures columns are only created once

  const handleAccept = (student) => {
    console.log(`Going out: ${student.name}`);
    
  };

  const handleReject = (student) => {
    console.log(`Entered the hostel premesis: ${student.name}`);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="container mx-auto mt-8">
      <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps()}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;