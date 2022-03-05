const User = require("../model/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../database/sendMail");
require("dotenv").config();
const User_Token = process.env.User_Token;
const { successResMsg, errorResMsg } = require("../utils/appResponse");
const AppError = require("../utils/appError");

//registration of new users
exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, email, password, role } =
      req.body;
    // a check to ensure all fields are inputted correctly
    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      return next(
        new AppError("kindly fill the required space" || "Unathorized", 401)
      );
    }
    // a check for password length
    if (password.length < 8) {
      return next(
        new AppError(
          "Password must be atleast 8 letters" || "password too weak",
          401
        )
      );
    }
    // a check for phoneNumber length
    if (phoneNumber.length < 11 || phoneNumber.length > 11) {
      return next(
        new AppError("PhoneNumber must be 11 numbers" || "invalid number", 401)
      );
    }
    // a check to avoid duplication of account

    let emailExist = await User.findOne({ email });
    if (emailExist) {
      return next(new AppError("Email exist!..please login", 401));
    }
    const hashPassword = await bcrypt.hash(password, 10);
    // console.log(hashPassword)
    const newUsers = await User.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashPassword,
      role,
    });
    let mailOptions = {
      to: newUsers.email,
      subject: "Verify Email",
      text: `Hi ${firstName},Pls verify your email`,
    };

    await sendMail(mailOptions);
    return successResMsg(res, 201, {
      message: "account created successfully",
      newUsers,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};
// login endpoint for users
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailExist = await User.findOne({ email });
    if (!emailExist) {
      return next(
        new AppError("email does not exists.please signup" || "not found", 401)
      );
    }
    let passwordExist = await bcrypt.compare(password, emailExist.password);
    if (!passwordExist) {
      return next(
        new AppError("email does not exists.please signup" || "not found", 401)
      );
    }
    const loginPayload = {
      id: emailExist.id,
      email: emailExist.email,
      password: emailExist.password,
      role: emailExist.role,
    };
    const token = await jwt.sign(loginPayload, User_Token, { expiresIn: "2h" });
    return successResMsg(res, 200, {
      message: "Login successfully",
      token,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};
// An endpoint used by admin to check for total users
exports.Count = async (req, res, next) => {
  try {
    const Count = await User.find();
    return successResMsg(res, 200, {
      message: "success",
      Count,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};
