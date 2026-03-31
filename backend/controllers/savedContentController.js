const SavedContent = require("../models/SavedContent");

// GET
exports.getSavedContent = async (req, res) => {
  const { category } = req.query;

  const filter = category ? { category } : {};
  const items = await SavedContent.find(filter);

  res.json(items);
};

// POST
exports.saveContent = async (req, res) => {
  const item = new SavedContent(req.body);
  await item.save();
  res.json(item);
};

// DELETE
exports.deleteSavedContent = async (req, res) => {
  await SavedContent.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
