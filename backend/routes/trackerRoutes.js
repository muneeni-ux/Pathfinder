const express = require("express");
const {
  getTrackerData,
  createConference,
  updateConference,
  deleteConference,
  createStation,
  updateStation,
  deleteStation,
} = require("../controller/trackerController");

const router = express.Router();

/* ===== PUBLIC ===== */
router.get("/", getTrackerData);

/* ===== CONFERENCES ===== */
router.post("/conference", createConference);
router.put("/conference/:id", updateConference);
router.delete("/conference/:id", deleteConference);

/* ===== STATIONS ===== */
router.post("/station", createStation);
router.put("/station/:id", updateStation);
router.delete("/station/:id", deleteStation);

module.exports = router;
