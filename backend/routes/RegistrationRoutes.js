const express = require("express");
const {
  createEntity,
  getEntities,
  getEntityById,
  updateEntity,
  deleteEntity
} = require("../controller/registrationController.js");
const parser = require("../middleware/cloudinaryUpload.js"); // Import your parser

const router = express.Router();

// CREATE
// We use parser.single('image') to handle one file upload with the field name "image"
router.post("/", parser.single("image"), createEntity);

// READ ALL
router.get("/:type", getEntities);

// READ SINGLE
router.get("/:type/:id", getEntityById);

// UPDATE
router.put("/:type/:id", updateEntity);

// DELETE
router.delete("/:type/:id", deleteEntity);

module.exports = router;