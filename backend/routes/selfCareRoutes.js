const express = require("express");
const router = express.Router();
const SelfCare = require("../models/selfcare");
const multer = require("multer");
const path = require("path");

// ================= MULTER CONFIG =================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// ================= GET =================

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const items = await SelfCare.find(filter);
    res.json(items);

  } catch (err) {
    console.log("GET ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ================= ADD =================

router.post("/", upload.single("image"), async (req, res) => {
  try {

    console.log("BODY:", req.body);   // ✅ DEBUG
    console.log("FILE:", req.file);   // ✅ DEBUG

    const { title, category, steps } = req.body;

    const newItem = new SelfCare({
      title,
      category,
      steps: steps ? JSON.parse(steps) : [],   // ✅ FIXED
      image: req.file ? `/uploads/${req.file.filename}` : ""
    });

    await newItem.save();

    res.status(201).json(newItem);

  } catch (err) {
    console.log("POST ERROR:", err);   // ✅ IMPORTANT
    res.status(400).json({ message: err.message });
  }
});

// ================= UPDATE =================

router.put("/:id", upload.single("image"), async (req, res) => {
  try {

    console.log("UPDATE BODY:", req.body);  // ✅ DEBUG
    console.log("UPDATE FILE:", req.file);  // ✅ DEBUG

    const updateData = {
      title: req.body.title,
      category: req.body.category,
      steps: req.body.steps ? JSON.parse(req.body.steps) : []   // ✅ FIXED
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await SelfCare.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    console.log("PUT ERROR:", err);   // ✅ IMPORTANT
    res.status(400).json({ message: err.message });
  }
});

// ================= DELETE =================

router.delete("/:id", async (req, res) => {
  try {

    await SelfCare.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;