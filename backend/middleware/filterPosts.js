const Post = require("../models/postModel");

const filterPosts = async (req, res, next) => {
  const search = req.query.search || "";
  let filters = {};
  Object.keys(req.query).forEach((item) => {
    if (item === "page" || item === "limit" || item === "search") return;
    filters[item] = req.query[item];
  });
  console.log(filters);

  req.data = await Post.find({
    $and: [
      {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { userName: { $regex: search, $options: "i" } },
        ],
      },
      filters,
    ],
  });
  next();
};

module.exports = { filterPosts };
