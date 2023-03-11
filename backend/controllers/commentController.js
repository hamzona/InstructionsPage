const Comment = require("../models/commentModel");

const postComment = async (req, res) => {
  const { content, postId, userName } = req.body;
  try {
    const newComment = await Comment.create({
      content,
      postId,
      userName,
    });
    res.json(newComment);
  } catch (e) {
    res.json({ error: e.message });
  }
};
const getComments = async (req, res) => {
  const { postId } = req.body;
  console.log(postId);
  try {
    const allComments = await Comment.find({ postId });
    res.json(allComments);
  } catch (e) {
    res.json({ error: e.message });
  }
};
const deleteComment = async (req, res) => {
  const { _id } = req.body;
  try {
    const deleteComment = await Comment.findById(_id);
    if (deleteComment === null) {
      throw Error("Comment doesnt exsist");
    }
    await deleteComment.remove();
    res.json(deleteComment);
  } catch (e) {
    res.json({ error: e.message });
  }
};
module.exports = { postComment, getComments, deleteComment };
