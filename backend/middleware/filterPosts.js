const Post = require("../models/postModel");

const filterPosts = async (req, res, next) => {
  const search = req.query.search || "";
  const max = req.query.max || 10000;
  const min = req.query.min || 0;
  let filters = {};
  Object.keys(req.query).forEach((item) => {
    if (item === "subject" || item === "jobType") {
      filters[item] = req.query[item];
    }
  });

  req.data = await Post.find({
    $and: [
      {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { userName: { $regex: search, $options: "i" } },
          { subject: { $regex: search, $options: "i" } },
        ],
      },
      filters,
      {
        price: { $gt: min, $lt: max },
      },
    ],
  });
  next();
};

module.exports = { filterPosts };
