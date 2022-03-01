const mongoose = require("mongoose");

const Order = mongoose.Schema;

const OrderSchema = new Order(
  {
    farm_order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
    },
    delivery: {
      type: String,
      enum: ["walk-in", "dispatch"],
      default: "walk-in",
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Order", OrderSchema);

module.exports = orderModel;
