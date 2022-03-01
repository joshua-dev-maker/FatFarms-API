const express = require("express");
const {
  CreateProduct,
  viewCategory,
  FarmDivision,
} = require("../controller/product.controller");
const { authorize, iAmAdmin } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/createProduct", authorize, iAmAdmin, CreateProduct);
router.get("/view-category/:category", viewCategory);
router.get("/farmDivision/:farmDiv", FarmDivision);

module.exports = router;
