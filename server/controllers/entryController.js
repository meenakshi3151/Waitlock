const asyncHandler = require("express-async-handler");
const User = require("../schemas/userSchema");
const goingOutt = asyncHandler(async (req, res) => {
    const { registrationNo } = req.body;
   // console.log(registrationNo);
   const currentTime = new Date();
   console.log(currentTime);
   const currentHour = currentTime.getHours();
    console.log(currentHour);
    const user = await User.findOne({ registrationNo });
    value=user.goingOut;
    if (value===false && currentHour>=6 && currentHour<=22) {
        user.goingOut= true;
        await user.save();
        console.log(user)
        res.status(200).json({ message: "Checked Out" });
    } 
    else {
        res.status(400);
        throw new Error("User not found");
    }
}
);
const comingIn = asyncHandler(async (req, res) => {
    const { registrationNo } = req.body;
    const user = await User.findOne({registrationNo});
    value=user.goingOut;
    if (value===true) {
        user.goingOut= false;
        await user.save();
        res.status(200).json({ message: "Checked in" });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
}
);
const getAllStudentsOut=asyncHandler(async(req,res)=>{
    const users=await User.find({goingOut:true});
    console.log(users);
    console.log("hello");
    res.json(users);
});
const getAllStudentsIn=asyncHandler(async(req,res)=>{
    const users=await User.find({goingOut:false});
    res.json(users);
});

const getAllStudentsLate = asyncHandler(async (req, res) => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour < 6 || currentHour >= 19) {
        try {
            const users = await User.find({ goingOut: true });
            res.json(users);
        } catch (error) {
            console.error("Error fetching late students:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.status(200).json({ message: "No students are late." });
    }
});


module.exports = { goingOutt,comingIn,getAllStudentsOut,getAllStudentsIn,getAllStudentsLate};
