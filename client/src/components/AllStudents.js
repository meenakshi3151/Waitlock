import React, { useState, useEffect } from "react";
import axios from "axios";

function AllStudents() {
  const [data, setData] = useState([]);

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/user/getAllUsers', config)
      .then((res) => {
        setData(res.data);
      });
  }, []);

  return (
    <>
      {data.map((item) => (
        <div key={item.registrationNo} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.registrationNo}</h5>
          <button className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none ${
            item.goingOut ? 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' : 'bg-gray-700 hover:bg-gray-800 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
          }`}>
            {item.goingOut ? 'Going Out' : 'Pending'}
          </button>
        </div>
      ))}
    </>
  );
}

export default AllStudents;
