const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, unique: true, required: true },
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
    year: { type: String, required: true },
    branch: { type: String, required: true },
    course: { type: String, required: true },
      phoneNo: { type: String, required: true },
      registrationNo: { type: String, required: true },
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