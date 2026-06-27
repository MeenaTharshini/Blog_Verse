const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getPosts,
  createPost,
  likePost,
  getMyPosts,
  updatePost,
  deletePost,
} = require("../controllers/postController");

router.get("/", getPosts);
router.get("/mine", auth, getMyPosts);

router.post("/", auth, createPost);

router.put("/:id/like",auth,  likePost);

router.put("/:id", auth, updatePost);

router.delete("/:id", auth, deletePost);

module.exports = router;