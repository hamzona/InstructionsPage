const Post = require("../models/postModel");

const pagination = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * pageSize;
    const total = await Post.countDocuments();

    const pages = Math.ceil(total / pageSize);

    let json = await Post.find().skip(skip).limit(pageSize);

    if (page > pages) {
      throw Error("Page not found");
    }

    res.json({
      count: json.length,
      page,
      pages,
      data: json,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = { pagination };
