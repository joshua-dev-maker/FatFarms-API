const mongoose = require("mongoose");

const Product = mongoose.Schema;

const ProductSchema = new Product(
  {
    productName:{
      type:String,
      required:true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Fishery", "Poultry", "Piggery", "Crops"],
    },
    Price: {
      type: String,
      required: true,
    },
    farmDiv: {
      type: String,
      enum:["feeds","research_analysis", "health", "training", "housing"]
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel
