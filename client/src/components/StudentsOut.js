import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useTable } from 'react-table';
function StudentsOut() {    
    const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching users...');
        const response = await axios.get('http://localhost:5000/getAllStudentsOut');
        console.log('Data fetched:', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); 

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
      Header: 'Year',
      accessor: 'year',
    },
    {
      Header: 'Branch',
      accessor: 'branch',
    },
    {
      Header: 'Course',
      accessor: 'course',
    },
    {
      Header: 'Phone No',
      accessor: 'phoneNo',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
  ], []); 


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
     
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
   
  );
}   
export default StudentsOut;