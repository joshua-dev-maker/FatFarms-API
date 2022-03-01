// creating an http server
const express = require("express");

const dotenv = require("dotenv").config();
const UsersRouter = require("./src/routes/user.route");
const AdminRouter = require("./src/routes/admin.route");
const ProductRouter = require("./src/routes/product.route");
const OrderRouter = require("./src/routes/order.route");
const connectDB = require("./src/database/connection.database");

// using express as a middleware
const app = express();

app.use(express.json());

const PORT = process.env.PORT;
connectDB();
// baseurl for fatfarms
app.get("/", (req, res) => {
  res.send("Homepage");
});
// using the router for each model
app.use("/api/v1", UsersRouter);
app.use("/api/v1", AdminRouter);
app.use("/api/v1", ProductRouter);
app.use("/api/v1", OrderRouter);
app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
