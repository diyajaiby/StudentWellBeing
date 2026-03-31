const mongoose = require("mongoose");

const selfCareSchema = new mongoose.Schema({
  title: String,
  category: String,
  image: String,
  steps: [String],
});

module.exports = mongoose.model("SelfCare", selfCareSchema);
