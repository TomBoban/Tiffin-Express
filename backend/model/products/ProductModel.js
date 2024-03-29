const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    shortDescription: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    menuOption1: {
      type: String,
      default: "Meal Plan not ready",
    },
    menuOption2: {
      type: String,
      default: "Meal Plan not ready",
    },
    menuOption3: {
      type: String,
      default: "Meal Plan not ready",
    },
  },
  {
    // convert all ids to json
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

//populate comments
productSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "post",
  localField: "_id",
  justOne: false,
});

// We need to create model from schema
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
