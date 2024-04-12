import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const attendanceSchema = mongoose.Schema({
  date: {
    type: Date,
    required: false,
    unique: true
  },
  status: {
    type: String,
    required: false,
  },
  loginTime : {
    type: String,
    required: false,
  },
  logoutTime: {
    type: String,
    required: false,
  }
});

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpires: {
      type: Date,
      default: null,
    },
    mobile: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    attendance: [attendanceSchema], 
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;