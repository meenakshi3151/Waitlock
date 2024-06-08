const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, unique: true },
        password: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/.test(value);
                },
                message: props => `password  must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character.`,
            },
        },
        year: { type: String },
        branch: { type: String },
        course: { type: String },
        phoneNo: { type: String },
        registrationNo: { type: String },
        role: { type: String, default: "user" },
        goingOut: { type: Boolean, default: false }
    }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
