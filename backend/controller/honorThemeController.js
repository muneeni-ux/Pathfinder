const HonorTheme = require("../models/HonourTheme");

/**
 * GET all honor themes
 */
const getHonorThemes = async (req, res) => {
  try {
    const themes = await HonorTheme.find({ isActive: true })
      .sort({ order: 1 });

    res.status(200).json(themes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch honor themes" });
  }
};

/**
 * CREATE a new honor theme
 */
const createHonorTheme = async (req, res) => {
  try {
    const { day, theme, icon, order } = req.body;

    const exists = await HonorTheme.findOne({ day });
    if (exists) {
      return res.status(400).json({ message: "Theme for this day already exists" });
    }

    const newTheme = await HonorTheme.create({
      day,
      theme,
      icon,
      order,
    });

    res.status(201).json(newTheme);
  } catch (error) {
    res.status(500).json({ message: "Failed to create honor theme" });
  }
};

/**
 * UPDATE a theme
 */
const updateHonorTheme = async (req, res) => {
  try {
    const updated = await HonorTheme.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Honor theme not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update honor theme" });
  }
};

/**
 * DELETE a theme
 */
const deleteHonorTheme = async (req, res) => {
  try {
    const deleted = await HonorTheme.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Honor theme not found" });
    }

    res.status(200).json({ message: "Honor theme deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete honor theme" });
  }
};

module.exports = {
  getHonorThemes,
  createHonorTheme,
  updateHonorTheme,
  deleteHonorTheme,
};
