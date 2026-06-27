const { readFile } = require("../utils/fileDB");

const getFeedPosts = () => {
  const posts = readFile("posts.json") || [];

  return posts.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
};

module.exports = { getFeedPosts };