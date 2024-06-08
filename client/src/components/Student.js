import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import { useToast } from '@chakra-ui/toast';

const StudentsTable = () => {
  const [data, setData] = useState([]);
  const toast=useToast();
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
  ], []); 

  const handleAccept = async (student) => {
    try {
      const response = await axios.put('http://localhost:5000/goingOut', {
        registrationNo: student.registrationNo,
        action: 'goingOut',
      });
      toast({
        title: "You can go out!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      console.log(`Going out: ${student.name}`, response.data);
    } catch (error) {
      console.error('Error sending accept request:', error);
      toast({
        title: "You cannot go out!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
    }
  };

  const handleReject = async (student) => {
    try {
      const response = await axios.put('http://localhost:5000/comingIn', {
        registrationNo: student.registrationNo,
        action: 'comingIn',
      });
      console.log(`Coming in: ${student.name}`, response.data);
      toast({
        title: "Entry is completed",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
    } catch (error) {
      console.error('Error sending reject request:', error);
      toast({
        title: "Entry is not completed",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
    }
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
