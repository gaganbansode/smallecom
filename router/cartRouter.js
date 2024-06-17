const express = require("express");
const {
  createCartController,
  getCartController,
} = require("../controller/cartController");
const router = express.Router();

router.get("/:id?", getCartController).post("/", createCartController);
module.exports = router;
