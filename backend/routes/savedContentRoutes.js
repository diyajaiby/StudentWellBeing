const express = require("express");
const router = express.Router();

const {
  getSavedContent,
  saveContent,
  deleteSavedContent
} = require("../controllers/savedContentController");

// GET saved items
router.get("/", getSavedContent);

// SAVE item
router.post("/", saveContent);

// DELETE saved item
router.delete("/:id", deleteSavedContent);

module.exports = router; // ✅ THIS IS CRITICAL
