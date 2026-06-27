const { readFile, writeFile } = require("../utils/fileDB");

// GET COMMENTS BY POST
const getCommentsByPost = (postId) => {
  const comments = readFile("comments.json");

  return comments.filter(
    (c) => String(c.postId) === String(postId)
  );
};

// ADD COMMENT (THIS IS THE IMPORTANT PART)
const addComment = (comment) => {
  const comments = readFile("comments.json");

  const newComment = {
    id: Date.now(),
    postId: String(comment.postId),
    userId: comment.userId,
    userName: comment.userName,
    text: comment.text,

    // 🔥 NEW FOR THREADS
    parentId: comment.parentId || null,

    createdAt: new Date().toISOString(),
  };

  comments.push(newComment);
  writeFile("comments.json", comments);

  return newComment;
};

module.exports = {
  getCommentsByPost,
  addComment,
};