const asyncHandler = require("express-async-handler");
const User = require("../schemas/userSchema");
//register the user
const OTPM=require('../schemas/otpSchema');
const registerUser = async (req, res) => {
    const { name, email, password, year, branch,
        course, phoneNo, registrationNo,OTP,role
    } = req.body;
    console.log(req.body)
    console.log(name, email, password, year, branch, course, phoneNo, registrationNo,OTP,role);
    // if (!name || !email || !password || !year || !branch || !course || !phoneNo || !registrationNo) {
    //     res.status(400);
    //     throw new Error("Please Enter all the Feilds");
    // }
    
    const userExists = await User.findOne({ email});
   
    if (userExists) {
        res.status(400);
        console.log(userExists);
        throw new Error("User already exists");
    }
    const response = await OTPM.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || OTP !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: 'The OTP is not valid',
      });
    }
    const user = await User.create({
        name,
        email,
        password,
        year,
        branch,
        course,
        phoneNo,
        registrationNo,
        role
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            year: user.year,
            branch: user.branch,
            course: user.course,
            phoneNo: user.phoneNo,
            registrationNo: user.registrationNo,
            
        });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
};
//for login
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password)) && user.role==="admin") {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        year: user.year,
        branch: user.branch,
        course: user.course,
        phoneNo: user.phoneNo,
        role:user.role,
        registrationNo: user.registrationNo,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });
  

  const getAllUsersWithQuery = asyncHandler(async (req, res) => {
    const { registrationNo } = req.query; 
    
    console.log('Received registrationNo:', registrationNo); 
    
    if (!registrationNo) {
        return res.status(400).json({ message: "registrationNo query parameter is required" });
    }

    const query = { registrationNo: { $regex: new RegExp(registrationNo, 'i') } };
    
    console.log('Constructed query:', query);

    try {
        const users = await User.find(query);
        
        if (users.length > 0) {
            return res.status(200).json(users);
        } else {
            return res.status(404).json({ message: "No users found with the provided registration number" });
        }
    } catch (error) {
        console.error('Error while fetching users:', error); 
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: "admin" } });
        console.log(users);
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
module.exports = { registerUser, authUser, getAllUsersWithQuery, getAllUsers }