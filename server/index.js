const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
const allowedOrigins = [
    'http://localhost:3000', 
  ];
  const PORT = process.env.PORT;
  const server = app.listen(
    PORT,
    console.log(`Server running on PORT ${PORT}...`)
  );