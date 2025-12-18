const Post = require("../models/Post.js");

// CREATE Post
const createPost = async (req, res) => {
  try {
    const { title, category, snippet, content } = req.body;

    // Check if image file exists from Multer
    if (!req.file) {
      return res.status(400).json({ error: "Cover image is required." });
    }

    const newPost = new Post({
      title,
      category,
      snippet,
      content,
      image: req.file.path, // Cloudinary URL
    });

    await newPost.save();
    res.status(201).json({ success: true, post: newPost });
  } catch (err) {
    console.error("Create Post Error:", err);
    res.status(500).json({ error: "Failed to create post." });
  }
};

// GET All Posts
const getPosts = async (req, res) => {
  try {
    const { category } = req.query;
    
    // Filter logic
    const query = category && category !== "All" ? { category } : {};

    // Sort by date descending (newest first)
    const posts = await Post.find(query).sort({ date: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts." });
  }
};

// GET Single Post
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE Post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.status(200).json({ success: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  deletePost,
};