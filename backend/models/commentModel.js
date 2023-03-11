const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  content: { type: String, required: true },
  postId: { type: String, required: true },
  userName: { type: String, required: true },
});
const model = mongoose.model("Comments", Schema);

module.exports = model;
