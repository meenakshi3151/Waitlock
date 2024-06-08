import React from 'react';
import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import SignUpForm from './components/Signup';
// import NavBar from './components/Navbar';
import Login from './components/Login';
import HomePage from './pages/HomePage';
import {Route,Routes} from 'react-router-dom';
import Student from './components/Student';
function App() {
  return (
 <>
 {/* <HomePage/> */}

  {/* <HomePage></HomePage> */}
  <Routes>
    <Route path="/" element={<HomePage/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/signup" element={<SignUpForm/>}></Route>
    <Route path="/student" element={<Student/>}></Route>
  </Routes>
 </>


  );
}

export default App;