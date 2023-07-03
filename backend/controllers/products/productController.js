const asyncHandler = require("express-async-handler");
const Product = require("../../model/products/ProductModel");

//@access: public

exports.getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).populate("category", "name").exec();

    if (products) {
      res.json(products);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error, "Error");
    res.status(500).json({ message: "Failed to get products" });
  }
});
//@desc:Create a single product
//@access: private Admin post

exports.createProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      image,
      description,
      shortDescription,
      price,
      rating,
      category,
    } = req.body;

    // Create a new product object
    const product = new Product({
      user: req.user._id,
      name,
      image,
      description,
      shortDescription,
      price,
      rating,
      category,
    });

    // Save the product to the database
    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create product" });
  }
});

// Update

exports.updateProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      image,
      description,
      shortDescription,
      price,
      rating,
      category,
    } = req.body;

    const productId = req.params.id;

    // Find the product by ID
    const product = await Product.findById(productId);

    if (product) {
      // Update the product fields
      product.name = name || product.name;
      product.image = image || product.image;
      product.description = description || product.description;
      product.shortDescription = shortDescription || product.shortDescription;
      product.price = price || product.price;
      product.rating = rating || product.rating;
      product.category = category || product.category;

      // Save the updated product to the database
      const updatedProduct = await product.save();

      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update product" });
  }
});
