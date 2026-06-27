const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { getFeedPosts } = require("../services/feedService");

router.get("/", auth, (req, res) => {
  try {
    const feed = getFeedPosts();
    res.json(feed);
  } catch (err) {
    res.status(500).json({ message: "Feed error" });
  }
});

module.exports = router;