const Order = require("../model/order.model");
const Product = require("../model/product.model");
const { successResMsg, errorResMsg } = require("../utils/appResponse");
const AppError = require("../utils/appError");

//creating an order by a user
exports.CreateOrder = async (req, res, next) => {
  try {
    const { farm_order, User, quantity, totalAmount, delivery } = req.body;
    if (!farm_order || !User || !quantity || !totalAmount || !delivery) {
      return next(new AppError("Please fill the required field", 401));
    }
    const productPrice = await Product.find({ _id: req.params.id }).select(
      "Price"
    );
    const newOrder = await Order.create({
      farm_order,
      User,
      qty: quantity,
      totalAmount,
      delivery,
    });
    //  { new: true, runValidators: true })
    return successResMsg(res, 201, {
      message: "Product created successfully",
      newOrder,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};
// USer updating or making chnages on the order
exports.updateOrder = async (req, res, next) => {
  try {
    const { _id } = req.query;
    const updateOrder = await Order.findOneAndUpdate({ _id }, req.body, {
      new: true,
    });
    return successResMsg(res, 200, {
      message: "order updated successfully",
      updateOrder,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};
// User deleting his/her order
exports.deleteOrder = async (req, res, next) => {
  try {
    const { _id } = req.query;
    const deleteOrder = await Order.find({ _id }, req.body);
    return successResMsg(res, 200, {
      message: "order deleted successfully",
      deleteOrder,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};
// Admin retrieving the total number of orders made
exports.CountOrder = async (req, res, next) => {
  try {
    const CountOrder = await Order.find();
    return successResMsg(res, 200, {
      message: "success",
      CountOrder,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};
