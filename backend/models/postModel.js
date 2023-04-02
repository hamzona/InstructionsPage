const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  userName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
  subject: { type: String },
  jobType: { type: String },
  userId: { type: String, required: true },
  rate: { type: Number },
  usersRated: { type: Array },
  rateScore: { type: Number },
  date: { type: Date },
});

const model = mongoose.model("posts", Post);

module.exports = model;
