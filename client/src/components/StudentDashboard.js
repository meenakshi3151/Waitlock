import React, { useState } from 'react';

function StudentDashboard() {
 
  const [GoingOut, setGoingOut] = useState(false);

 

  const handleButton = async () => {
    const response = await fetch('http://localhost:5000/goingOut', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ registrationNo: userInfo.registrationNo }),
    });

    if (response.ok) {
      console.log('Success:', response);
      setGoingOut(!userInfo.goingOut);
    } else {
      console.log('Error:', response);
    }
  };
  const userInfo = JSON.parse (localStorage.getItem("userInfo"));
  return (
    <div>
     
      {GoingOut ? (
        <button onClick={handleButton}>
          Going Out    
        </button>
      ) : (
        <p>Pending</p>
      )}
    </div>
  );
}

export default StudentDashboard;
