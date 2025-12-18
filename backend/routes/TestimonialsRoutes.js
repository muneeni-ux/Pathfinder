const express = require("express");
const router = express.Router();
const testimonialController = require("../controller/testimonialsController");

// Public routes
router.get("/", testimonialController.getApprovedTestimonials);

// Admin routes (require authentication middleware in real setup)
router.get("/all", testimonialController.getAllTestimonials);
router.post("/", testimonialController.createTestimonial);
router.put("/approve/:id", testimonialController.approveTestimonial);
router.delete("/:id", testimonialController.deleteTestimonial);
router.put("/like/:id", testimonialController.likeTestimonial);

module.exports = router;
