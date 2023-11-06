const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params:{
    folder: 'dokoopy',
    allowedFormats : ["jpg", "jpeg", "png", "pdf", "svg"],
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
      storage: storage,
      limits: {
          fileSize: 1024 * 1024 * 5, // 5 MB
      },
  });


module.exports = upload;