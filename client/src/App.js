import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import SignUpForm from './components/Signup';
// import NavBar from './components/Navbar';
import Login from './components/Login';
import HomePage from './pages/HomePage';
function App() {
  return (
 <>
 {/* <HomePage/> */}

  {/* <HomePage></HomePage> */}
  <Login></Login>
  <SignUpForm></SignUpForm>

 </>


  );
}

export default App;
