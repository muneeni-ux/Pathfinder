const express = require("express");
const {
  getHonorThemes,
  createHonorTheme,
  updateHonorTheme,
  deleteHonorTheme,
} = require("../controller/honorThemeController");

const router = express.Router();

/**
 * Public
 */
router.get("/", getHonorThemes);

/**
 * Admin (protect later)
 */
router.post("/", createHonorTheme);
router.put("/:id", updateHonorTheme);
router.delete("/:id", deleteHonorTheme);

module.exports = router;
