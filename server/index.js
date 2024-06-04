const express = require('express');
// const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');
const emailRoutes = require('./routes/emailRoutes');
dotenv.config();
connectDB();

const app = express();


app.use(express.json());
const allowedOrigins = [
    'http://localhost:3000', 
  ];
  const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
  app.use(cors(corsOptions));
  const PORT = process.env.PORT;
  const server = app.listen(
    PORT,
    console.log(`Server running on PORT ${PORT}...`)
  );
  app.use('/api/user', userRoutes);
  app.use("/",emailRoutes)