const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define the upload path
const guideUploadPath = path.join(__dirname, "../uploads/guides");

// Ensure the directory exists
if (!fs.existsSync(guideUploadPath)) {
  fs.mkdirSync(guideUploadPath, { recursive: true });
}

// Configure multer storage
const guideStorage = multer.diskStorage({
  destination: guideUploadPath, // Safe because the folder now exists
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});

const uploadGuide = multer({ storage: guideStorage });

module.exports = uploadGuide;
