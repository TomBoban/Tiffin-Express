const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
    },
    user: {
      type: Object,
      required: [true, "User is required"],
    },
    description: {
      type: String,
      required: [true, "Comment description is required"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
