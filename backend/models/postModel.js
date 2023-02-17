const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  userName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
  userId: { type: String, required: true },
});

const model = mongoose.model("posts", Post);

module.exports = model;
