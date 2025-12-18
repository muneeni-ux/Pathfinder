const Resource = require("../models/Resources");

// CREATE Resource
const createResource = async (req, res) => {
  try {
    const { title, category, type, description } = req.body;

    // Validate if any file was uploaded
    if (!req.files || (!req.files.file && !req.files.video)) {
      return res.status(400).json({ error: "A main file or video is required." });
    }

    let fileUrl = "";
    let thumbnailUrl = "";

    // 1. Handle Document/Form Upload
    if (req.files.file) {
      fileUrl = req.files.file[0].path;
    }

    // 2. Handle Video Upload
    if (req.files.video) {
      fileUrl = req.files.video[0].path;
    }

    // 3. Handle Thumbnail Upload (Optional)
    if (req.files.thumbnail) {
      thumbnailUrl = req.files.thumbnail[0].path;
    } else if (category === "video") {
      // Default placeholder if video has no thumbnail
      thumbnailUrl = "https://via.placeholder.com/300x200?text=No+Thumbnail";
    }

    const newResource = new Resource({
      title,
      category,
      type,
      description,
      fileUrl,
      thumbnailUrl,
    });

    await newResource.save();
    res.status(201).json({ success: true, resource: newResource });

  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Server error during upload." });
  }
};

// GET ALL (With optional category filter)
const getResources = async (req, res) => {
  try {
    const { category } = req.query; // e.g., ?category=video
    const query = category ? { category } : {};
    
    const resources = await Resource.find(query).sort({ createdAt: -1 });
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch resources." });
  }
};

// DELETE
const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    await Resource.findByIdAndDelete(id);
    res.status(200).json({ success: "Resource deleted." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete resource." });
  }
};

// UPDATE
const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Resource.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update resource." });
  }
};

module.exports = {
  createResource,
  getResources,
  deleteResource,
  updateResource,
};