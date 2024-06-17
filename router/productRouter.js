const express = require("express");
const {
  createProductController,
  getProductController,
} = require("../controller/productController");
const upload = require("../middleware/upload");
const router = express.Router();

router
  .get("/:id?", getProductController)
  .post("/", upload, createProductController);
module.exports = router;
