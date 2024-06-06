const nodemailer = require("nodemailer");
const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";




const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
});



//from user to admin
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

//from admin to user if he/she is late

const mailSender = async ({body}) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port:process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      }
    });
    // Send emails to users
  
    let info = await transporter.sendMail({
      from: 'Meenakshi',
      to: body.email,
      subject: "Bill Due",
      html:"You are late",
    });
    console.log("Email info: ", info);
     console.log("successfull")
    return info;
  } catch (error) {
    console.log("error occuered", error.message)
    return error.message
  }
};

const mailSenderOTP = async (email, title, body) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port:process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      }
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: 'Meenakshi',
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { sendEmail ,mailSender,mailSenderOTP};