const nodemailer = require("nodemailer");
const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
    
    const { name, email, message } = req.body;
    console.log(name, email, message);
  
    var mailOption = {
      from: email,
      to: process.env.TO_MAIL,
      subject: "Query from " + name,
      text:
        "Received a query from " +
        name +
        " with email id " +
        email +
        " - " +
        message,
    };


transporter.sendMail(mailOption, function(error, info){
    if (error) {
      res.status(400);
      throw new Error(error);
        console.log(error);
    } else {
        console.log( info.response);
    }
});
});

module.exports = { sendEmail };