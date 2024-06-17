const cartModal = require("../models/CartModel");
const productModel = require("../models/productModel");
const mongoose = require("mongoose");

const cartInfo = async (params) => {
  const cart = await cartModal.find({ userID: params }).limit(1);

  if (!cart) {
    throw new Error("Cart not found");
  }

  //   // Find all product images with matching productId
  const product = await productModel.find({
    _id: cart[0].productid,
  });

  //   // Add images to the product object
  const cartinfo = {
    _id: cart[0]._id,
    userID: cart[0].userID,
    productlist: product.map((product) => product.name),
    createdAt: cart[0].createdAt,
    updatedAt: cart[0].updatedAt,
  };

  //   return productWithImages;

  // const data = await productInfo(lastinserted);
  return cartinfo;
};

const createCartController = async (req, res) => {
  const postData = req.body;
  let lastinserted, newpostData;

  try {
    Cart = new cartModal(postData);
    Cart = await Cart.save();
    lastinserted = Cart._id;
  } catch (err) {
    console.log(err);
    return next();
  }

  const cart = await cartModal.findById(lastinserted);

  if (!cart) {
    throw new Error("Cart not found");
  }

  //   // Find all product images with matching productId
  const product = await productModel.find({
    _id: cart.productid,
  });

  //   // Add images to the product object
  const cartinfo = {
    _id: cart._id,
    userID: cart.userID,
    productlist: product.map((product) => product.name),
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt,
  };

  //   return productWithImages;

  // const data = await productInfo(lastinserted);
  res.status(201).send({
    success: true,
    cartinfo,
  });
};

const getCartController = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await cartInfo(id ? id : "");
    res.status(201).send({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createCartController,
  getCartController,
};
