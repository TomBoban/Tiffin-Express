const Category = require("../../model/categories/categoryModel");
const asyncHandler = require("express-async-handler");

//@desc Get all categories
//@route GET /api/categories
//@access Public

exports.getAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get categories" });
  }
});

exports.createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    // Create a new category object
    const category = new Category({
      name,
    });

    // Save the category to the database
    const createdCategory = await category.save();

    res.status(201).json(createdCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create category" });
  }
});
