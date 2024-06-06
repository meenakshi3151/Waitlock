const express = require("express");
const router = express.Router();
const {sendOTP}=require('../controllers/otpControllers');
router.post('/sendOTP',sendOTP);
module.exports=router;

