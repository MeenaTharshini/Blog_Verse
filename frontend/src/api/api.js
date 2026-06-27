const BASE_URL = "https://blog-verse-api.onrender.com/api";


// ================= TOKEN =================

export const getToken = () => {
  return localStorage.getItem("token");
};


// unified auth header (SAFE + FIXED)
export const authHeader = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};


// ================= AUTH =================

export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};


export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};


// ================= POSTS =================

export const getPosts = async () => {
  const res = await fetch(`${BASE_URL}/posts`);
  return await res.json();
};


export const createPost = async (post) => {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(post),
  });

  return await res.json();
};


export const likePost = async (id) => {
  const res = await fetch(
    `${BASE_URL}/posts/${id}/like`,
    {
      method: "PUT",
      headers: authHeader(),
    }
  );

  if (!res.ok) {
    throw new Error("Like failed");
  }

  return await res.json();
};


// ================= FEED (FIXED) =================

export const getFeed = async () => {
  const res = await fetch(`${BASE_URL}/feed`, {
    method: "GET",
    headers: authHeader(),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to load feed");
  }

  return data;
};


// ================= COMMENTS =================

export const getComments = async (postId) => {
  const res = await fetch(`${BASE_URL}/comments/${postId}`);
  return await res.json();
};


export const addComment = async (comment) => {
  const res = await fetch(`${BASE_URL}/comments`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      postId: comment.postId,
      text: comment.text,
      parentId: comment.parentId || null, // 🔥 NEW
    }),
  });

  return await res.json();
};


// ================= DASHBOARD =================

export const getDashboard = async (userId) => {
  const res = await fetch(`${BASE_URL}/dashboard/${userId}`);
  return await res.json();
};


// ================= MY POSTS =================

export const getMyPosts = async () => {
  const res = await fetch(`${BASE_URL}/posts/mine`, {
    method: "GET",
    headers: authHeader(),
  });

  return await res.json();
};


// ================= UPDATE POST =================

export const updatePost = async (id, title, content) => {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify({ title, content }),
  });

  return await res.json();
};


// ================= DELETE POST =================

export const deletePost = async (id) => {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });

  return await res.json();
};