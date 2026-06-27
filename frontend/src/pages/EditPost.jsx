import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePost } from "../api/api";

function EditPost() {
  const navigate = useNavigate();

  const post = JSON.parse(
    localStorage.getItem("editingPost")
  );

  const [title, setTitle] = useState(
    post?.title || ""
  );

  const [content, setContent] = useState(
    post?.content || ""
  );

  const handleUpdate = async () => {
    try {
      const result = await updatePost(
        post.id,
        title,
        content
      );

      if (result.message === "Post not found") {
        alert("Post not found");
        return;
      }

      localStorage.removeItem("editingPost");

      alert("Post updated successfully 🚀");

      navigate("/my-posts");

    } catch (err) {
      console.log(err);

      alert("Failed to update post");
    }
  };

  return (
    <div className="write-page">

      <h1>Edit Post</h1>

      <input
        className="write-title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        className="write-content"
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
      />

      <button
        className="publish-btn"
        onClick={handleUpdate}
      >
        Update Post
      </button>

    </div>
  );
}

export default EditPost;