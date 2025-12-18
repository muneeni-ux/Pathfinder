const LeadershipProfile = require("../models/LeadershipProfile.js");
const cloudinary = require("../config/cloudinary.js");

/**
 * CREATE leadership profile (Admin)
 */
const createLeader = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Profile image is required",
      });
    }

    const { name, role, socials } = req.body;

    if (!name || !role) {
      return res.status(400).json({
        success: false,
        message: "Name and role are required",
      });
    }

    const leader = await LeadershipProfile.create({
      name,
      role,
      imageUrl: req.file.path,
      imagePublicId: req.file.filename,
      socials: socials ? JSON.parse(socials) : {},
      approved: false,
    });

    res.status(201).json({
      success: true,
      message: "Leadership profile created. Pending approval.",
      data: leader,
    });
  } catch (error) {
    console.error("Create Leader Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create leadership profile",
    });
  }
};

/**
 * GET approved leadership profiles (Public)
 */
const getApprovedLeaders = async (req, res) => {
  try {
    const leaders = await LeadershipProfile.find({ approved: true }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: leaders,
    });
  } catch (error) {
    console.error("Fetch Leaders Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch leadership profiles",
    });
  }
};

/**
 * GET all leadership profiles (Admin)
 */
const getAllLeaders = async (req, res) => {
  try {
    const leaders = await LeadershipProfile.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: leaders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch leaders",
    });
  }
};

/**
 * APPROVE leadership profile (Admin)
 */
const approveLeader = async (req, res) => {
  try {
    const leader = await LeadershipProfile.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );

    if (!leader) {
      return res.status(404).json({
        success: false,
        message: "Leader not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Leader approved successfully",
      data: leader,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to approve leader",
    });
  }
};

/**
 * UPDATE leadership profile (Admin)
 */
const updateLeader = async (req, res) => {
  try {
    const leader = await LeadershipProfile.findById(req.params.id);
    if (!leader) {
      return res.status(404).json({
        success: false,
        message: "Leader not found",
      });
    }

    if (req.file) {
      await cloudinary.uploader.destroy(leader.imagePublicId);
      leader.imageUrl = req.file.path;
      leader.imagePublicId = req.file.filename;
    }

    leader.name = req.body.name || leader.name;
    leader.role = req.body.role || leader.role;
    leader.socials = req.body.socials
      ? JSON.parse(req.body.socials)
      : leader.socials;

    await leader.save();

    res.status(200).json({
      success: true,
      message: "Leadership profile updated",
      data: leader,
    });
  } catch (error) {
    console.error("Update Leader Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update leadership profile",
    });
  }
};

/**
 * DELETE leadership profile (Admin)
 */
const deleteLeader = async (req, res) => {
  try {
    const leader = await LeadershipProfile.findById(req.params.id);
    if (!leader) {
      return res.status(404).json({
        success: false,
        message: "Leader not found",
      });
    }

    await cloudinary.uploader.destroy(leader.imagePublicId);
    await leader.deleteOne();

    res.status(200).json({
      success: true,
      message: "Leadership profile deleted",
    });
  } catch (error) {
    console.error("Delete Leader Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete leadership profile",
    });
  }
};

module.exports = {
  createLeader,
  getApprovedLeaders,
  getAllLeaders,
  approveLeader,
  updateLeader,
  deleteLeader,
};
