const express = require("express");
const User = require("../controller/users.controller");

const { authorize, iAmAdmin } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/create", User.register);
router.post("/login", User.login);

router.get("/count", authorize, iAmAdmin, User.Count);

module.exports = router;
