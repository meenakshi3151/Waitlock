import React from 'react';
import './App.css';
import SignUpForm from './components/Signup';
import Login from './components/Login';
import HomePage from './pages/HomePage';
import {Route,Routes} from 'react-router-dom';
import Student from './components/Student';
import StudentsIn from './components/StudentsIn';
import StudentsOut from './components/StudentsOut';
function App() {
  return (
 <>
  <Routes>
    <Route path="/" element={<HomePage/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/signup" element={<SignUpForm/>}></Route>
    <Route path="/student" element={<Student/>}></Route>
    <Route path="/studentin" element={<StudentsIn/>}></Route>
    <Route path="/studentout" element={<StudentsOut/>}></Route>
  </Routes>
 </>


  );
}

export default App;