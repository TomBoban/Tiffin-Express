const asyncHandler = require("express-async-handler");
const Product = require("../../model/products/ProductModel");

//@access: public

exports.getAllProducts = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find({});
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error, "Error");
  }
});

//@desc:Create a single product
//@access: private Admin post

exports.createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, image, description, price, rating } = req.body;

    // Create a new product object
    const product = new Product({
      user: req.user._id,
      name,
      image,
      description,
      price,
      rating,
    });

    // Save the product to the database
    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create product" });
  }
});
