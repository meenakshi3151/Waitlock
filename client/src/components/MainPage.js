import React from 'react';
import { Link } from 'react-router-dom';
import banner from '../images/banner.jpg';

function MainPage() {
  return (
    <div
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold text-white mb-8">
          Welcome to Hostel Management System
        </h1>
        <div className="flex justify-center space-x-4">
          <Link to="/signup">
            <button className="bg-white text-black font-semibold py-2 px-4 rounded hover:bg-black hover:text-blue transition duration-300">
              Signup
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-white text-black font-semibold py-2 px-4 rounded hover:bg-black hover:text-blue transition duration-300">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
