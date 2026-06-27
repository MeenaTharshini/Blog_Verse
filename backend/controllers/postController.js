const {
  getAllPosts,
  createPost: createPostService,
  likePost,
  getPostsByUser,
  updatePost: updatePostService,
  deletePost: deletePostService,
} = require("../services/postService");

// ================= GET ALL POSTS =================
exports.getPosts = (req, res) => {
  res.json(getAllPosts());
};

// ================= CREATE POST =================
exports.createPost = (req, res) => {
  console.log("POST HIT");
  console.log("USER:", req.user);
  console.log("BODY:", req.body);

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const newPost = {
    title: req.body.title,
    content: req.body.content,
    userId: req.user.id,
    author: req.user.name,
  };

  const post = createPostService(newPost);

  console.log("CREATED:", post);

  res.status(201).json(post);
};

// ================= LIKE POST =================
exports.likePost = (req, res) => {
  try {
    const result = likePost(
      req.params.id,
      req.user.id
    );

    if (!result) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json(result);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Like failed",
    });
  }
};

// ================= MY POSTS =================
exports.getMyPosts = (req, res) => {
  try {
    const posts = getPostsByUser(req.user.id);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// ================= UPDATE POST =================
exports.updatePost = (req, res) => {
  try {
    const post = updatePostService(req.params.id, req.body);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to update post" });
  }
};

// ================= DELETE POST =================
exports.deletePost = (req, res) => {
  try {
    const deleted = deletePostService(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete post" });
  }
};