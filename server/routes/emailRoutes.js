const express = require("express");
const router = express.Router();

const { sendEmail,mailSender } = require("../controllers/emailControllers");
router.post("/sendEmail", sendEmail);
router.post("/mailSender", mailSender);
module.exports = router;
