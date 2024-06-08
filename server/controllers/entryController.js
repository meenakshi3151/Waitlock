const asyncHandler = require("express-async-handler");
const User = require("../schemas/userSchema");
const goingOutt = asyncHandler(async (req, res) => {
    const { registrationNo } = req.body;
   // console.log(registrationNo);
   const currentTime = new Date();
   const currentHour = currentTime.getHours();
  if(currentHour<6 && currentHour>=19  ){
    res.status(400);
    throw new Error("You can't go out at this time");   
  }
    const user = await User.findOne({ registrationNo });
   // console.log(user)
    value=user.goingOut;
    if (value===false ) {
        user.goingOut= true;
        
        await user.save();
        console.log(user)
        res.status(200).json({ message: "Checked Out" });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
}
);
const comingIn = asyncHandler(async (req, res) => {
    const { registrationNo } = req.body;
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
   if(currentHour<6 && currentHour>=19  ){
     res.status(400);
     throw new Error("You can't go out at this time");   
   }
    const user = await User.findOne({registrationNo});
    value=user.goingOut;
    if (value===true) {
        user.goingOut= false;
        await user.save();
        res.status(200).json({ message: "Checked Out" });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
}
);
module.exports = { goingOutt,comingIn};
