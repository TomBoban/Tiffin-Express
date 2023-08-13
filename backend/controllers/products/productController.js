const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Product = require("../../model/products/ProductModel");





//@access: public

exports.getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).populate("category", "name").populate("user").exec();

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

//@access: public

exports.getSingleProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id)
      .populate("category","name").populate("comments")
      .exec();

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error, "Error");
    res.status(500).json({ message: "Failed to get the product" });
  }
});

//@desc:Create a single product
//@access: private Admin post

exports.createProduct = async (req, res) => {
  try {
  
      const { name, description, shortDescription, price, rating, category, menuOption1, menuOption2, menuOption3 } = req.body;
     
      console.log(category,"category");

       const image = req.file ? req.file.path.replace(/\\/g, '/') : "";
       const imagePath = image.replace("public", "");

      const product = new Product({
        user: req.user._id,
        name,
        image:imagePath, 
        description,
        shortDescription,
        price,
        rating,
        category,
        menuOption1,
        menuOption2,
        menuOption3,
      });

      const createdProduct = await product.save();

      res.status(201).json(createdProduct);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create product' });
  }
};

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
      menuOption1,
      menuOption2,
      menuOption3
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
      product.menuOption1 = menuOption1 || product.menuOption1;
      product.menuOption2 = menuOption2 || product.menuOption2;
      product.menuOption3 = menuOption3 || product.menuOption3;

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