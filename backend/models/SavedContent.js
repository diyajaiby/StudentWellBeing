const mongoose = require("mongoose");

const SavedContentSchema = new mongoose.Schema({
  title: String,
  category: String,
  image: String,
  steps: [String],
});

module.exports = mongoose.model(
  "SavedContent",
  SavedContentSchema,
  "savedcontents"
);
