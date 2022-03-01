const Product = require("../model/product.model");
const { successResMsg, errorResMsg } = require("../utils/appResponse");
const AppError = require("../utils/appError");

//Admin creating products
exports.CreateProduct = async (req, res, next) => {
  try {
    const { productName, category, farmDiv, Price } = req.body;
    if (!productName || !category || !Price) {
      return next(new AppError("Please fill the required field", 401));
    }
    const newProduct = await Product.create({
      productName,
      category,
      farmDiv,
      Price,
    });
    return successResMsg(res, 201, {
      message: "Product created successfully",
      newProduct,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};
// users viewing products by categories
exports.viewCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const viewCategory = await Product.find({ category });
    return successResMsg(res, 200, {
      message: "success",
      viewCategory,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};
// viewing all farm division results
exports.FarmDivision = async (req, res, next) => {
  try {
    const { farmDiv } = req.params;
    const FarmDivision = await Product.find({ farmDiv });
    return successResMsg(res, 200, {
      message: "success",
      FarmDivision,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};
