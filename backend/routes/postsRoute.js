const express = require("express");
const route = express.Router();
const {
  addPost,
  deletePost,
  updatePost,
  getAllMyPosts,
} = require("../controllers/postController");

//middleware
const authJwt = require("../middleware/authJwtMiddleware");
const { pagination } = require("../middleware/pagination");

//get all
route.get("/allPosts", pagination);

//get allMyPosts
route.get("/allMy", authJwt, getAllMyPosts);

// add
route.post("/add", authJwt, addPost);

//delete
route.post("/delete", authJwt, deletePost);

//update
route.patch("/update", authJwt, updatePost);

module.exports = route;
