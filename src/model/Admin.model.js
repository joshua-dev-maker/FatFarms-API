const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//signup for new admin
const AdminSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "User",
    },
  },
  { timestamps: true }
);
//

const AdminModel = mongoose.model("Admin", AdminSchema);

module.exports = AdminModel;
