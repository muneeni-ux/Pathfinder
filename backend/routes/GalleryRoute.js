const express = require("express");
const router = express.Router();
const parser = require("../middleware/cloudinaryUpload");
const galleryController = require("../controller/galleryController");

// Upload media (image/video)
router.post("/upload", parser.single("media"), galleryController.uploadMedia);

// Get all media (optional filter by type)
router.get("/", galleryController.getAllMedia);

// Get latest media (limit via query)
router.get("/latest", galleryController.getLatestMedia);

// Delete media by ID
router.delete("/:id", galleryController.deleteMedia);

module.exports = router;
