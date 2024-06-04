const asyncHandler = require("express-async-handler");
const User = require("../schemas/userSchema");
//register the user
const registerUser = async (req, res) => {
    const { name, email, password, year, branch,
        course, phoneNo, registrationNo
    } = req.body;

    if (!name || !email || !password || !year || !branch || !course || !phoneNo || !registrationNo) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }
    
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        console.log(userExists);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        year,
        branch,
        course,
        phoneNo,
        registrationNo
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
module.exports = { registerUser }