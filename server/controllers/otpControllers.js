// controllers/otpController.js
const otpGenerator = require('otp-generator');
const User=require('../schemas/userSchema');
const OTP=require('../schemas/otpSchema');  

const sendOTP = async (req, res) => {
    
  try {
    const { email } = req.body;
   
    const existsUser= await User.findOne({ email });

    if (existsUser) {
        return res.status(401).json({
        success: false,
        message: 'User is already in our system',
      });
    }

    let otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
   // console.log("hi"+otp)
    let result = await OTP.findOne({ otp: otp });
   // console.log(result)
    while (result) {
      otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    // console.log(otpBody)
    // console.log(otpPayload)
    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otp,
    });

  } catch (error) {
   
    return res.status(500).json({ success: false, error: error.message });
  }
};
module.exports = { sendOTP };
