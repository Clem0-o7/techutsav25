import mongoose from "mongoose";
import { isEmail } from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is Empty"],
    unique: true,
    validate: [isEmail, "Invalid Email"],
    lowercase: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  fullName: {
    type: String,
    required: [true, "Full Name is Empty"],
    minLength: [2, "Length must be at least 2 Characters"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone is Empty"],
    minLength: [10, "Length is Not 10 Characters"],
    maxLength: [10, "Length is Not 10 Characters"],
  },
  collegeName: {
    type: String,
    required: [true, "College Name is Required"],
    minLength: [2, "Length must be at least 2 Characters"],
  },
  department: {
    type: String,
    required: [true, "Department Name is Required"],
    minLength: [2, "Length must be at least 2 Characters"],
  },
  paid: {
    type: Boolean,
    default: false,
  },
  transactionNumber: {
    type: String,
    default: "",
  },
  transactionScreenshot: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    minLength: [6, "Length must be at least 6 Characters"],
  },
  selectedDepartment: {
    type: String,
    default: "",
  },
  // Email verification fields
  emailOTP: {
    type: String,
  },
  emailOTPExpires: {
    type: Date,
  },
});

// Hash password only if modified or new
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Static method for login
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) return user;
    throw Error("Incorrect Password");
  }
  throw Error("Invalid Email");
};

// Prevent model overwrite in development
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;


