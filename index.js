const express = require("express");
const morgan = require("morgan");
const app = express();
// const authRoute = require("./routes/authRoute");
// const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./router/productRouter");
const cartRoute = require("./router/cartRouter");
var cors = require("cors");

// env configure
require("dotenv").config();

// db configure
require("./config/db");

// middlewares

app.use(express.static("./uploads"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// routes
// app.use("/api/v1/auth", authRoute);
// app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);
app.get("/", (req, res) => {
  res.send("<h1>Welcome to smallecom app</h1>");
});

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
