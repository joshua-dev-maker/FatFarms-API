const express = require("express");
const { addAdmin, login } = require("../controller/Admin.controller");

const router = express.Router();

router.post("/createAdmin", addAdmin);
router.post("/Adminlogin", login);

module.exports = router;
