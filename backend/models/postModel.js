const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  userId: { type: String, required: true },
});

const model = mongoose.model("posts", Post);

module.exports = model;
