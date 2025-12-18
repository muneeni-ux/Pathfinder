const express = require("express");
const parser = require("../middleware/cloudinaryUpload.js");
const {
  createLeader,
  getApprovedLeaders,
  getAllLeaders,
  approveLeader,
  updateLeader,
  deleteLeader,
} = require("../controller/leadershipContoller.js");

const router = express.Router();

// Public
router.get("/", getApprovedLeaders);

// Admin
router.get("/admin", getAllLeaders);
router.post("/", parser.single("image"), createLeader);
router.put("/:id", parser.single("image"), updateLeader);
router.put("/approve/:id", approveLeader);
router.delete("/:id", deleteLeader);

module.exports = router;
