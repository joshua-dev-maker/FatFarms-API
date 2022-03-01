const express = require("express");
const { authorize, iAmAdmin } = require("../middlewares/auth.middleware");

const {
  CreateOrder,
  updateOrder,
  deleteOrder,
  CountOrder,
} = require("../controller/order.controller");
const router = express.Router();

router.post("/createOrder", CreateOrder);
router.patch("/updateOrder", updateOrder);
router.delete("/deleteOrder", deleteOrder);
router.get("/CountOrder", authorize, iAmAdmin, CountOrder);

module.exports = router;
