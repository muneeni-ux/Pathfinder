const Testimonial = require("../models/Testimonials");

// CREATE a new testimonial (pending admin approval)
exports.createTestimonial = async (req, res) => {
  try {
    const { name, role, story } = req.body;
    if (!name || !role || !story) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const testimonial = new Testimonial({ name, role, story });
    await testimonial.save();

    res.status(201).json({
      success: true,
      message: "Testimonial submitted for admin approval",
      data: testimonial,
    });
  } catch (err) {
    console.error("Create Testimonial Error:", err);
    res.status(500).json({ success: false, message: "Failed to submit testimonial" });
  }
};

// GET all approved testimonials
exports.getApprovedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: testimonials });
  } catch (err) {
    console.error("Fetch Testimonials Error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch testimonials" });
  }
};

// GET all testimonials (admin view)
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: testimonials });
  } catch (err) {
    console.error("Fetch All Testimonials Error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch testimonials" });
  }
};

// APPROVE a testimonial (admin)
exports.approveTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ success: false, message: "Testimonial not found" });

    testimonial.approved = true;
    await testimonial.save();

    res.status(200).json({ success: true, message: "Testimonial approved", data: testimonial });
  } catch (err) {
    console.error("Approve Testimonial Error:", err);
    res.status(500).json({ success: false, message: "Failed to approve testimonial" });
  }
};

// DELETE a testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ success: false, message: "Testimonial not found" });

    await testimonial.deleteOne();
    res.status(200).json({ success: true, message: "Testimonial deleted" });
  } catch (err) {
    console.error("Delete Testimonial Error:", err);
    res.status(500).json({ success: false, message: "Failed to delete testimonial" });
  }
};

// LIKE a testimonial
exports.likeTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ success: false, message: "Testimonial not found" });

    testimonial.likes += 1;
    await testimonial.save();

    res.status(200).json({ success: true, data: testimonial });
  } catch (err) {
    console.error("Like Testimonial Error:", err);
    res.status(500).json({ success: false, message: "Failed to like testimonial" });
  }
};
