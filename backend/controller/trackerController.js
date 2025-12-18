const Conference = require("../models/Conference.js");
const Station = require("../models/Station.js");

/* ============================
   READ (PUBLIC)
============================ */

/**
 * GET FULL TRACKER DATA
 */
const getTrackerData = async (req, res) => {
  try {
    const conferences = await Conference.aggregate([
      {
        $lookup: {
          from: "stations",
          localField: "_id",
          foreignField: "conference",
          as: "stations",
        },
      },
      {
        $addFields: {
          trees: { $sum: "$stations.treesPlanted" },
        },
      },
      { $sort: { trees: -1 } },
    ]);

    const totalTrees = conferences.reduce(
      (sum, c) => sum + c.trees,
      0
    );

    res.status(200).json({
      totalTrees,
      topRegion: conferences[0] || null,
      conferences,
    });
  } catch (error) {
    console.error("Tracker fetch error:", error);
    res.status(500).json({ message: "Failed to load tracker data" });
  }
};

/* ============================
   CONFERENCE CRUD
============================ */

/**
 * CREATE Conference
 */
const createConference = async (req, res) => {
  try {
    const { name, regionType } = req.body;

    const exists = await Conference.findOne({ name });
    if (exists)
      return res.status(409).json({ message: "Conference already exists" });

    const conference = await Conference.create({ name, regionType });
    res.status(201).json(conference);
  } catch (error) {
    res.status(500).json({ message: "Failed to create conference" });
  }
};

/**
 * UPDATE Conference
 */
const updateConference = async (req, res) => {
  try {
    const conference = await Conference.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!conference)
      return res.status(404).json({ message: "Conference not found" });

    res.status(200).json(conference);
  } catch (error) {
    res.status(500).json({ message: "Failed to update conference" });
  }
};

/**
 * DELETE Conference (also deletes stations)
 */
const deleteConference = async (req, res) => {
  try {
    const conference = await Conference.findById(req.params.id);
    if (!conference)
      return res.status(404).json({ message: "Conference not found" });

    await Station.deleteMany({ conference: conference._id });
    await conference.deleteOne();

    res.status(200).json({ message: "Conference deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete conference" });
  }
};

/* ============================
   STATION CRUD
============================ */

/**
 * CREATE Station
 */
const createStation = async (req, res) => {
  try {
    const { name, treesPlanted, conference } = req.body;

    const station = await Station.create({
      name,
      treesPlanted,
      conference,
    });

    res.status(201).json(station);
  } catch (error) {
    res.status(500).json({ message: "Failed to create station" });
  }
};

/**
 * UPDATE Station
 */
const updateStation = async (req, res) => {
  try {
    const station = await Station.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!station)
      return res.status(404).json({ message: "Station not found" });

    res.status(200).json(station);
  } catch (error) {
    res.status(500).json({ message: "Failed to update station" });
  }
};

/**
 * DELETE Station
 */
const deleteStation = async (req, res) => {
  try {
    const station = await Station.findByIdAndDelete(req.params.id);
    if (!station)
      return res.status(404).json({ message: "Station not found" });

    res.status(200).json({ message: "Station deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete station" });
  }
};

module.exports = {
  getTrackerData,
  createConference,
  updateConference,
  deleteConference,
  createStation,
  updateStation,
  deleteStation,
};
