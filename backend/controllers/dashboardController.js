const { readFile } = require("../utils/fileDB");

exports.getDashboard = (req, res) => {
  try {
    const { userId } = req.params;

    const posts = readFile("posts.json") || [];
    const comments = readFile("comments.json") || [];

    const userPosts = posts.filter(
      (post) =>
        String(post.userId) === String(userId)
    );

    const totalPosts = userPosts.length;

    const totalLikes = userPosts.reduce(
      (sum, post) => sum + Number(post.likes || 0),
      0
    );

    const totalComments = comments.filter(
      (comment) =>
        userPosts.some(
          (post) =>
            String(post.id) ===
            String(comment.postId)
        )
    ).length;

    const engagementScore =
      totalLikes + totalComments;

    const recentPosts = userPosts
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .slice(0, 5);

    res.json({
      totalPosts,
      totalLikes,
      totalComments,
      engagementScore,
      recentPosts,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Dashboard error",
    });
  }
};