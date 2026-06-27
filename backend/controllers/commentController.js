const {
  getCommentsByPost,
  addComment,
} = require("../services/commentService");

// GET COMMENTS
const getComments = (req, res) => {
  const postId = req.params.postId;

  const comments = getCommentsByPost(postId);

  const commentMap = {};
  const rootComments = [];

  // create map
  comments.forEach((c) => {
    commentMap[c.id] = { ...c, replies: [] };
  });

  // build tree
  comments.forEach((c) => {
    if (c.parentId) {
      if (commentMap[c.parentId]) {
        commentMap[c.parentId].replies.push(commentMap[c.id]);
      }
    } else {
      rootComments.push(commentMap[c.id]);
    }
  });

  res.json(rootComments);
};

// ADD COMMENT
const createComment = (req, res) => {
  const { postId, text, parentId } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Comment cannot be empty" });
  }

  const comment = addComment({
    postId,
    text,
    parentId, // 🔥 important
    userId: req.user.id,
    userName: req.user.name,
  });

  res.status(201).json(comment);
};

module.exports = {
  getComments,
  createComment,
};