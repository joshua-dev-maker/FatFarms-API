const Admin = require("../model/Admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User_Token = process.env.User_Token;
const { successResMsg, errorResMsg } = require("../utils/appResponse");
const AppError = require("../utils/appError");

//registration of new admin
exports.addAdmin = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      staffNumber,
      email,
      password,
      role,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !staffNumber ||
      !email ||
      !password ||
      !role
    ) {
      return next(new AppError("Please fill the required field", 401));
    }
    let emailExist = await Admin.findOne({ email });
    if (emailExist) {
      return next(new AppError("Email already exist please login", 401));
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashPassword,
      role,
    });

    return successResMsg(res, 201, {
      message: "Admin created successfully",
      newAdmin,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};
// login endpoint for Admin
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailExist = await Admin.findOne({ email });
    if (!emailExist) {
      return next(new AppError("Email does not exist please Signup", 401));
    }
    let passwordExist = await bcrypt.compare(password, emailExist.password);
    if (!passwordExist) {
      return next(new AppError("Invalid details" || "password incorrect", 401));
    }
    const loginPayload = {
      id: emailExist.id,
      email: emailExist.email,
      password: emailExist.password,
      role: emailExist.role,
    };
    const token = await jwt.sign(loginPayload, User_Token, { expiresIn: "2h" });
    return successResMsg(res, 201, {
      message: "Login successful",
      token,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};
