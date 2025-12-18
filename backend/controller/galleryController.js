const Gallery = require("../models/Gallery");
const cloudinary = require("../config/cloudinary");

/**
 * Upload media to Cloudinary & save to DB
 */
exports.uploadMedia = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

    const media = new Gallery({
      url: req.file.path,
      public_id: req.file.filename,
      title: req.body.title || "",
      type: req.body.type || "image",
    });

    await media.save();
    res.status(201).json({ success: true, data: media });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Get all media (optionally filtered by type)
 */
exports.getAllMedia = async (req, res) => {
  try {
    const type = req.query.type;
    const filter = type ? { type } : {};
    const media = await Gallery.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: media });
  } catch (err) {
    console.error("Fetch Media Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Get latest N media
 */
exports.getLatestMedia = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 4;
    const media = await Gallery.find().sort({ createdAt: -1 }).limit(limit);
    res.status(200).json({ success: true, data: media });
  } catch (err) {
    console.error("Fetch Latest Media Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Delete media from Cloudinary and DB
 */
exports.deleteMedia = async (req, res) => {
  try {
    const media = await Gallery.findById(req.params.id);
    if (!media) return res.status(404).json({ success: false, message: "Media not found" });

    await cloudinary.uploader.destroy(media.public_id);
    await media.deleteOne();

    res.status(200).json({ success: true, message: "Media deleted successfully" });
  } catch (err) {
    console.error("Delete Media Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
