const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const CartItem = require("../../model/cart/CartModel");
const Product = require("../../model/products/ProductModel");


//@desc: Add product to cart
//@access: private User post
exports.addToCart = asyncHandler(async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Check if the product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    
    const cartItem = await CartItem.findOne({ user: userId, product: productId });

    if (cartItem) {
    
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
     
      await CartItem.create({ user: userId, product: productId, quantity });
    }

    res.status(201).json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add product to cart" });
  }
});


//@desc: Substract product to cart
//@access: private User post
exports.decreaseToCart = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Check if the product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartItem = await CartItem.findOne({ user: userId, product: productId });



    if (cartItem) {
      // If the cart item exists, decrement the quantity by 1
      cartItem.quantity -= 1;

      // If the quantity becomes 0 or less, remove the cart item
      if (cartItem.quantity <= 0) {
        await CartItem.findOneAndDelete({ _id: cartItem._id });
      } else {
        await cartItem.save();
      }
    } else {
      // If the cart item does not exist, return an error
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Product quantity decreased successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to decrease product quantity" });
  }
});


//@desc: Get user's cart items
//@access: private User get
exports.getCartItems = asyncHandler(async (req, res) => {
 
  try {
    const userId = req.user._id;


    const cartItems = await CartItem.find({ user: userId }).populate("product").exec();

    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get cart items" });
  }
});

//@desc: Update cart item quantity
//@access: private User put
exports.updateCartItemQuantity = asyncHandler(async (req, res) => {
 
  try {
    const { cartItemId, quantity } = req.body;

    // Check if the provided cart item ID is valid
    if (!mongoose.Types.ObjectId.isValid(cartItemId)) {
      return res.status(400).json({ message: "Invalid cart item ID" });
    }

    // Find the cart item by ID
    const cartItem = await CartItem.findById(cartItemId);

    if (cartItem) {
      // Update the cart item's quantity
      cartItem.quantity = quantity;
      await cartItem.save();

      res.json({ message: "Cart item quantity updated successfully" });
    } else {
      res.status(404).json({ message: "Cart item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update cart item quantity" });
  }
});

//@desc: Remove product from cart
//@access: private User delete
exports.removeFromCart = asyncHandler(async (req, res) => {
  
  try {
    const cartItemId = req.params.id;

    // Check if the provided cart item ID is valid
    if (!mongoose.Types.ObjectId.isValid(cartItemId)) {
      return res.status(400).json({ message: "Invalid cart item ID" });
    }

    // Find the cart item by ID
    const cartItem = await CartItem.findById(cartItemId);

    if (cartItem) {
      // Remove the cart item from the database
      await CartItem.findOneAndDelete({ _id: cartItem._id });
    

      res.json({ message: "Product removed from cart successfully" });
    } else {
      res.status(404).json({ message: "Cart item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to remove product from cart" });
  }
});

//@desc: Clear user's cart
//@access: private User delete
exports.clearCart = asyncHandler(async (req, res) => {

  try {
    const userId = req.user._id;
 

    // Remove all cart items associated with the user
    await CartItem.deleteMany({ user: userId });

    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to clear cart" });
  }
});
