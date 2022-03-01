const jwt = require("jsonwebtoken");
const User_Token = process.env.User_Token;
require("dotenv").config();

const authorize = async (req, res, next) => {
  try {
    let authArray = req.headers.authorization.split(" ");
    if (!authArray.includes("Bearer")) {
      return res.status(401).json({
        message: "Token required to start with Bearer..." || "unauthorized",
      });
    }
    let token = authArray[1];
    if (!token) {
      return res.status(401).json({
        message: "Token is required..." || "unauthorized",
      });
    }
    
    const decryptToken = await jwt.verify(token, User_Token, {
      expiresIn: "1h",
    });

    req.user = decryptToken;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "server error" || "error.message",
    });
  }
};

const iAmAdmin = async (req, res, next) => {
  try {
    const {role} = req.user;
    if (role === "Admin") 
      next();
    else {
      return res.status(401).json({
        message: "you do not have access to this resource" || "access denied",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = { authorize, iAmAdmin }