const express = require("express");
const { registerUser , authUser, getAllUsers} = require("../controllers/userControllers");
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(authUser);router.get("/getUsers",getAllUsers);  

module.exports = router;