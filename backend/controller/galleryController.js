const Gallery = require("../models/Gallery");
const cloudinary = require("../config/cloudinary");

/**
 * Upload media to Cloudinary & save to DB
 */
exports.uploadMedia = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

    // Robustly read Cloudinary/multer file fields (support different middleware shapes)
    const url = req.file.secure_url || req.file.path || req.file.url || "";
    const public_id = req.file.filename || req.file.public_id || req.file.publicId || "";

    // Infer type from uploaded file mime if not provided
    let inferredType = "image";
    if (req.file.mimetype && req.file.mimetype.startsWith("video")) inferredType = "video";

    const media = new Gallery({
      url,
      public_id,
      title: req.body.title || "",
      category: req.body.category || "events",
      type: req.body.type || inferredType,
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
    const { type, category, search } = req.query;
    const filter = {};

    if (type && type !== "all") filter.type = type;
    if (category && category !== "all") filter.category = category;
    if (search) filter.title = { $regex: search, $options: "i" };

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
    const { type, category } = req.query;
    const filter = {};
    if (type && type !== "all") filter.type = type;
    if (category && category !== "all") filter.category = category;

    const media = await Gallery.find(filter).sort({ createdAt: -1 }).limit(limit);
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
