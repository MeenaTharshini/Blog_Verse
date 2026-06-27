const { getFeedPosts } = require("../services/feedService");

exports.getFeed = (req, res) => {
  try {
    const posts = getFeedPosts();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load feed" });
  }
};