const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary"); // Ensure you have this config file

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "PathFinder_Resources";
    let resource_type = "auto"; // Auto-detects image vs video vs raw (pdf)

    if (file.mimetype.startsWith("video/")) {
      folder += "/training_videos";
      resource_type = "video";
    } else if (file.mimetype.startsWith("image/")) {
      folder += "/thumbnails";
      resource_type = "image";
    } else {
      // PDFs, Docs, etc.
      folder += "/documents";
      resource_type = "raw"; 
    }

    return {
      folder,
      resource_type,
      public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`,
    };
  },
});

const upload = multer({ storage });
module.exports = upload;