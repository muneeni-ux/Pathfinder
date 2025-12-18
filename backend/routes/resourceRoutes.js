const express = require("express");
const { 
  createResource, 
  getResources, 
  deleteResource, 
  updateResource 
} = require("../controller/resourceController.js");
const upload = require("../middleware/resourceUpload.js"); // Import the multer config

const router = express.Router();

// CREATE Route
// Accepts:
// 1. 'file' (for PDFs/Docs)
// 2. 'video' (for Training Videos)
// 3. 'thumbnail' (Image for the video)
router.post(
  "/",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]),
  createResource
);

// READ Routes
router.get("/", getResources); // Usage: /api/resources?category=video

// UPDATE & DELETE
router.put("/:id", updateResource);
router.delete("/:id", deleteResource);

module.exports = router;