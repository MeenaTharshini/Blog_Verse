const { readFile, writeFile } = require("../utils/fileDB");

// GET ALL POSTS
const getAllPosts = () => {
  return readFile("posts.json") || [];
};

// CREATE POST
const createPost = (post) => {
  const posts = readFile("posts.json") || [];

  const newPost = {
  id: Date.now().toString(),
  title: post.title,
  content: post.content,
  userId: String(post.userId),
  author: post.author,
  likes: 0,
  likedUsers: [],
  createdAt: new Date().toISOString(),
};

  posts.push(newPost);
  writeFile("posts.json", posts);

  return newPost;
};

// LIKE POST
const likePost = (postId, userId) => {
  const posts = readFile("posts.json") || [];

  const index = posts.findIndex(
    (p) => String(p.id) === String(postId)
  );

  if (index === -1) return null;

  const post = posts[index];

  if (!post.likedUsers) {
    post.likedUsers = [];
  }

  const alreadyLiked =
    post.likedUsers.includes(String(userId));

  if (alreadyLiked) {
    post.likedUsers = post.likedUsers.filter(
      (id) => String(id) !== String(userId)
    );

    post.likes = Math.max(
      0,
      (post.likes || 0) - 1
    );
  } else {
    post.likedUsers.push(String(userId));

    post.likes = (post.likes || 0) + 1;
  }

  posts[index] = post;

  writeFile("posts.json", posts);

  return {
    likes: post.likes,
    liked: !alreadyLiked,
  };
};

// USER POSTS
const getPostsByUser = (userId) => {
  const posts = readFile("posts.json") || [];

  return posts.filter(
    (p) => String(p.userId) === String(userId)
  );
};

// UPDATE POST
const updatePost = (id, data) => {
  const posts = readFile("posts.json") || [];

  const index = posts.findIndex((p) => String(p.id) === String(id));
  if (index === -1) return null;

  posts[index] = {
    ...posts[index],
    title: data.title,
    content: data.content,
    updatedAt: new Date().toISOString(),
  };

  writeFile("posts.json", posts);
  return posts[index];
};

// DELETE POST
const deletePost = (id) => {
  const posts = readFile("posts.json") || [];

  const filtered = posts.filter((p) => String(p.id) !== String(id));

  if (filtered.length === posts.length) return false;

  writeFile("posts.json", filtered);
  return true;
};

module.exports = {
  getAllPosts,
  createPost,
  likePost,
  getPostsByUser,
  updatePost,
  deletePost,
};