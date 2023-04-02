const Post = require("../models/postModel");
const Profil = require("../models/authModel");

const addPost = async (req, res) => {
  const { title, price, description, subject, jobType } = req.body;

  try {
    console.log(title);
    if (!title) {
      throw Error("Title is required");
    }
    const newPost = await Post.create({
      userName: req.userName,
      title: title,
      description: description,
      price: price,
      subject: subject,
      jobType: jobType,
      userId: req.user,
      usersRated: [],
      rateScore: 0,
      rate: null,
      date: new Date(),
    });

    res.json(newPost);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const ratePost = async (req, res) => {
  const rate = parseInt(req.body.rate);
  const { _id } = req.body;
  try {
    ME = await Profil.findById({ _id: await req.user.toString() });
    console.log(rate);
    const data = await Post.findOne(
      { _id },
      { rateScore: 1, _id: 0, usersRated: 1 }
    );
    const DataRate =
      (await (data.rateScore + rate)) / (data.usersRated.length + 1);

    const postRate = await Post.findOneAndUpdate(
      { _id: _id },
      {
        $inc: { rateScore: rate },
        $push: { usersRated: { name: ME.name, rate: rate } },
        $set: { rate: DataRate },
      },
      { returnOriginal: false }
    );
    res.json(postRate);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const getAllMyPosts = async (req, res) => {
  try {
    const myPosts = await Post.find({ userId: req.user }).sort({ _id: -1 });

    res.json(myPosts);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const deletePost = async (req, res) => {
  const { _id } = req.body;
  try {
    const deletePost = await Post.findOne({ _id });
    await deletePost.remove();
    res.json(deletePost);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
const updatePost = async (req, res) => {
  const { _id, title } = req.body;

  try {
    const updatePost = await Post.findOne({ _id });
    updatePost.title = title;
    await updatePost.save();
    res.json(updatePost);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
module.exports = {
  addPost,
  deletePost,
  updatePost,
  getAllMyPosts,
  ratePost,
};
