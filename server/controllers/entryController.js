const asyncHandler = require("express-async-handler");
const User = require("../schemas/userSchema");
//a logged in user clicks on the checkin button means he/she wants to go out
const goingOut = asyncHandler(async (req, res) => {
    const { registrationNo } = req.body;
    const user = await User.findOne({ registrationNo });
    if (user) {
        user.goingout= true;
        await user.save();
        res.status(200).json({ message: "Checked Out" });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
}
);
//a logged in user clicks on the pending button means he/she is coming back
const comingBack = asyncHandler(async (req, res) => {
    const { registrationNo } = req.body;
    const user = await User.findOne({ registrationNo });
    if (user) {
        user.goingout= false;
        await user.save();
        res.status(200).json({ message: "Checked In" });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
}
);
module.exports = { goingOut , comingBack};
