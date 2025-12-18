const Club = require("../models/Club.js");
const Volunteer = require("../models/Volunteer.js");
const Ambassador = require("../models/Ambassador.js");
const Partner = require("../models/Partner.js");

const getModelByType = (type) => {
  switch (type) {
    case "clubs": return Club;
    case "volunteers": return Volunteer;
    case "ambassadors": return Ambassador;
    case "partners": return Partner;
    default: return null;
  }
};

/**
 * CREATE entity with Cloudinary Support
 */
const createEntity = async (req, res) => {
  try {
    // 1. Extract Type
    const type = req.body.type;
    if (!type) return res.status(400).json({ error: "Registration type is required." });

    const Model = getModelByType(type);
    if (!Model) return res.status(400).json({ error: "Invalid registration type." });

    // 2. Extract Data
    // With FormData, req.body is flat. We spread it directly.
    let payload = { ...req.body };

    // 3. Handle Image Upload (If file exists)
    if (req.file && req.file.path) {
      payload.image = req.file.path; // Cloudinary URL
    }

    // 4. Specific Logic for Clubs
    if (type === "clubs") {
      payload.approved = false;
      payload.trees = 0;
      // Ensure numeric fields are numbers (FormData sends strings)
      if (payload.members) payload.members = Number(payload.members);
      if (payload.founded) payload.founded = Number(payload.founded);
    }

    // 5. Save to DB
    const entity = new Model(payload);
    await entity.save();

    res.status(201).json({ success: `${type} created successfully.`, entity });

  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
/**
 * READ all entities
 */
const getEntities = async (req, res) => {
  const { type } = req.params;
  const Model = getModelByType(type);
  
  if (!Model) {
    return res.status(400).json({ error: "Invalid type." });
  }

  try {
    // Only return APPROVED clubs. For other types, return all.
    const query = type === "clubs" ? { approved: true } : {};
    const entities = await Model.find(query).sort({ createdAt: -1 });
    
    res.status(200).json(entities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data." });
  }
};

/**
 * READ single entity by ID
 */
const getEntityById = async (req, res) => {
  const { type, id } = req.params;
  const Model = getModelByType(type);
  
  if (!Model) return res.status(400).json({ error: "Invalid type." });

  try {
    const entity = await Model.findById(id);
    if (!entity) return res.status(404).json({ error: `${type} not found.` });
    res.status(200).json(entity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch entity." });
  }
};

/**
 * UPDATE entity by ID
 */
const updateEntity = async (req, res) => {
  const { type, id } = req.params;
  const { data } = req.body;
  const Model = getModelByType(type);
  
  if (!Model) return res.status(400).json({ error: "Invalid type." });

  try {
    const updated = await Model.findByIdAndUpdate(id, data, { new: true });
    if (!updated) return res.status(404).json({ error: `${type} not found.` });
    res.status(200).json({ success: `${type} updated successfully.`, updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update entity." });
  }
};

/**
 * DELETE entity by ID
 */
const deleteEntity = async (req, res) => {
  const { type, id } = req.params;
  const Model = getModelByType(type);

  if (!Model) return res.status(400).json({ error: "Invalid type." });

  try {
    const deleted = await Model.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: `${type} not found.` });
    res.status(200).json({ success: `${type} deleted successfully.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete entity." });
  }
};

module.exports = {
  createEntity,
  getEntities,
  getEntityById,
  updateEntity,
  deleteEntity,
};