// controllers/otpController.js
const otpGenerator = require('otp-generator');
const OTP = require('../models/otpModel');
const User = require('../models/userSchema');

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
    
    let result = await OTP.findOne({ otp: otp });
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
    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otp,
    });

  } catch (error) {
   
    return res.status(500).json({ success: false, error: error.message });
  }
};
modules.export={sendOTP}
