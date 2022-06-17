import asyncHandler from "express-async-handler";

import Product from "../models/productModel.js";

//@decs Fetch all products
//@route GET /api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@decs Fetch single product matches id
//@route GET /api/products/id/:id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@decs Fetch all products match category
//@route GET /api/products/category/:category
//@access Public
const getProductsByCategory = asyncHandler(async (req, res) => {
  const product = await Product.find({ category: req.params.category });

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("There is no product in this category");
  }
});

//@decs Delete product
//@route DELETE /api/products/id/:id
//@access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "This product has been removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@decs Create product
//@route POST /api/products
//@access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, image, category, countInStock, description } = req.body;
  const user = req.user;

  const productExist = await Product.findOne({ name });

  if (productExist) {
    res.status(400);
    throw new Error("Product already exists");
  }

  const createdProduct = await Product.create({
    name,
    price,
    user,
    image,
    category,
    countInStock,
    description,
  });

  if (createProduct) {
    res.status(201).json(createdProduct);
  } else {
    res.status(400);
    throw new Error("Invalid product data");
  }
});

//@decs Update product
//@route PUT /api/products
//@access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@decs Create new review
//@route POST /api/products/id/:id/reviews
//@access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  getProductsByCategory,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
