const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let folder = "PathFinder_uploads";
    let allowed_formats = ["jpg", "jpeg", "png", "webp", "mp4"];
    
    if (file.mimetype.startsWith("video/")) {
      folder += "/videos";
      allowed_formats = ["mp4", "mov", "avi"];
    } else {
      folder += "/images";
    }

    return {
      folder,
      allowed_formats,
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`
    };
  },
});

const parser = multer({ storage });

module.exports = parser;
