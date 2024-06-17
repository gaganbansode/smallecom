const productModel = require("../models/productModel");
const imageModal = require("../models/productimages");
const mongoose = require("mongoose");
// var braintree = require("braintree");
// const orderModal = require("../models/orderModal");

async function productInfo(params) {
  const pipeline = [];

  if (params) {
    pipeline.push({ $match: { _id: params } });
  }
  pipeline.push(
    {
      $lookup: {
        from: "productimages", // Collection name of ProductImage model
        localField: "_id",
        foreignField: "productid",
        as: "images",
      },
    },
    {
      $addFields: {
        images: "$images.image", // Extract just the 'image' field from 'images' array
      },
    },
    {
      $sort: { createdAt: -1 }, // Sort by createdAt in descending order
    },
    {
      $project: {
        _id: 1,
        name: 1,
        images: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    }
  );

  const productWithImages = await productModel.aggregate(pipeline);
  return productWithImages;
}

const createProductController = async (req, res) => {
  //   let filePaths = req.files.map((file) => `uploads/${file.filename}`);
  //   res.send({ message: "Files uploaded!", files: filePaths });

  const postData = req.body;
  let Product;
  let imageData;
  let lastinserted, newpostData;
  try {
    Product = new productModel(postData);
    Product = await Product.save();
    lastinserted = Product._id;
    if (req.files.length > 0) {
      newpostData = req.files.map((file) => {
        return { productid: Product._id, image: file.filename };
      });
      imageData = imageModal.insertMany(newpostData);
    }
  } catch (err) {
    console.log(err);
    return next();
  }

  //   const product = await productModel.findById(lastinserted);

  //   if (!product) {
  //     throw new Error("Product not found");
  //   }

  //   // Find all product images with matching productId
  //   const productImages = await imageModal.find({ productid: lastinserted });

  //   // Add images to the product object
  //   const productWithImages = {
  //     _id: product._id,
  //     name: product.name,
  //     images: productImages.map((image) => image.image),
  //     createdAt: product.createdAt,
  //     updatedAt: product.updatedAt,
  //   };

  //   return productWithImages;

  const data = await productInfo(lastinserted);
  res.status(201).send({
    success: true,
    data,
  });
};

const getProductController = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await productInfo(id ? new mongoose.Types.ObjectId(id) : "");
    res.status(201).send({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProductController,
  getProductController,
};
