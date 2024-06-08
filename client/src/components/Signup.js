import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from "@chakra-ui/toast";
import { useNavigate } from 'react-router-dom';
const SignUpForm = () => {
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const toast=useToast();
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    year: '',
    branch: '',
    course: '',
    phoneNo: '',
    OTP:'',
    registrationNo: ''
  });
  // console.log(formData.OTP);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = () => {
   // console.log(formData.email);
    if (!formData.email.endsWith('@mnnit.ac.in')) {
      toast(
       {
         title: "Please enter organisation email address",
         status: "warning",
         duration: 5000,
         isClosable: true,
         position: "bottom",
       }
      )
     return;
   }
    axios.post('http://localhost:5000/sendOTP', { email: formData.email })
   
      .then(response => {
     //   console.log(response.data);
       // alert('OTP sent successfully');
      // console.log("hiiiiiiiiiiii");
        setOtpSent(true);
        toast({
          title: "OTP sent successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        console.log(response)
      })
      .catch(error => {
        console.error('There was an error sending the OTP!', error);
        toast(
          {
            title: "There was an error sending the OTP!",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          }
         )
      });
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();
    
  
    console.log(formData);
    formData.OTP=otp;
    console.log(formData);
    axios.post('http://localhost:5000/api/user/register', formData)
      .then(response => {
        console.log(response.data);
        alert('Sign up successful');
        toast({
          title: "Sign up successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        navigate('/login');
        
      })
      .catch(error => {
        console.error('There was an error signing up!', error);
        toast({
          title: "Error occured",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      });
  };

  return (
    <div className="max-w-md mx-auto bg-blue-100 p-8 mt-10 rounded-lg shadow-md border border-gray-300">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Year</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Branch</label>
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Course</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Registration Number</label>
          <input
            type="text"
            name="registrationNo"
            value={formData.registrationNo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-2">
          <button
            type="button"
            onClick={handleSendOtp}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            disabled={otpSent}
          >
            {otpSent ? 'OTP Sent' : 'Send OTP'}
          </button>
        </div>
        {otpSent && (
          <>
            <div className="mb-2">
              <label className="block text-gray-700">Enter OTP</label>
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={handleOtpChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            
          </>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
