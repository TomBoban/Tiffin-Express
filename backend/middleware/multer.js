const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = path.join("public", "uploads"); // Set the path where images will be stored on the server inside the "public" directory
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

// Set up Multer instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5 MB (adjust as needed)
  },
});

module.exports = upload;
