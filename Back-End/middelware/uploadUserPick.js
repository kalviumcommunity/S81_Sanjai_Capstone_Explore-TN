const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Upload path
const pickUploadPath = path.join(__dirname, "../uploads/user-picks");

// Ensure folder exists
if (!fs.existsSync(pickUploadPath)) {
  fs.mkdirSync(pickUploadPath, { recursive: true });
}

// Multer storage config
const pickStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pickUploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});

// Upload middleware – expecting a single file with field name 'image'
const uploadUserPick = multer({ storage: pickStorage });

module.exports = uploadUserPick;
