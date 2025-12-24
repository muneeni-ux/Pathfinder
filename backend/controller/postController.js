const Post = require("../models/Post.js");
const fs = require('fs'); // If you need to delete old local files, otherwise ignore

// CREATE Post
const createPost = async (req, res) => {
  try {
    // 1. Extract date from body, default to Date.now() if not provided/empty
    const { title, category, snippet, content, date } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Cover image is required." });
    }

    const newPost = new Post({
      title,
      category,
      snippet,
      content,
      image: req.file.path, 
      // 2. Use the submitted date, or fallback to now
      date: date ? new Date(date) : Date.now(), 
    });

    await newPost.save();
    res.status(201).json({ success: true, post: newPost });
  } catch (err) {
    console.error("Create Post Error:", err);
    res.status(500).json({ error: "Failed to create post." });
  }
};

// UPDATE Post (New Function)
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, snippet, content, date } = req.body;

    // 1. Find existing post
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    // 2. Update fields
    post.title = title || post.title;
    post.category = category || post.category;
    post.snippet = snippet || post.snippet;
    post.content = content || post.content;
    
    // 3. Update date if provided
    if (date) {
        post.date = new Date(date);
    }

    // 4. Update image ONLY if a new file is uploaded
    if (req.file) {
      post.image = req.file.path;
    }

    await post.save();
    res.status(200).json({ success: true, post });
  } catch (err) {
    console.error("Update Post Error:", err);
    res.status(500).json({ error: "Failed to update post." });
  }
};

// GET All Posts
const getPosts = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category && category !== "All" ? { category } : {};
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
  updatePost, // Export the new function
  getPosts,
  getPostById,
  deletePost,
};