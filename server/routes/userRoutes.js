const express = require("express");
const { registerUser , authUser, getAllUsers, getAllUsersWithQuery} = require("../controllers/userControllers");
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(authUser);router.get("/getAllUsers",getAllUsers);  
router.get("/getAllUsersWithQuery",getAllUsersWithQuery);

module.exports = router;