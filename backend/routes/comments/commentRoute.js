const express = require("express");

const authMiddleware = require("../../middleware/authMiddleware");
const { createCommentCtrl, fetchAllCommentsCtrl, fetchSingleCommentCtrl, updateCommentCtrl, deleteCommentCtrl } = require("../../controllers/comments/commentCtrl");


const commentRoutes = express.Router();

commentRoutes.post("/", authMiddleware, createCommentCtrl);
commentRoutes.get("/", fetchAllCommentsCtrl);
commentRoutes.get("/:id", authMiddleware, fetchSingleCommentCtrl);
commentRoutes.put("/:id", authMiddleware, updateCommentCtrl);
commentRoutes.delete("/:id", authMiddleware, deleteCommentCtrl);

module.exports = commentRoutes;
