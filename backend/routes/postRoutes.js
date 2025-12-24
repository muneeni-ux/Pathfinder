const express = require("express");
const { 
  createPost, 
  getPosts, 
  getPostById, 
  deletePost,
  updatePost
} = require("../controller/postController.js");
const parser = require("../middleware/cloudinaryUpload.js"); // Use your first middleware snippet

const router = express.Router();

// CREATE (Expects 'image' field in FormData)
router.post("/", parser.single("image"), createPost);
router.put("/:id", parser.single("image"), updatePost);
// READ
router.get("/", getPosts);
router.get("/:id", getPostById);

// DELETE
router.delete("/:id", deletePost);

module.exports = router;