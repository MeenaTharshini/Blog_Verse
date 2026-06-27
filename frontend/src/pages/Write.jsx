import { useState } from "react";
import axios from "axios";

import {
  FiEdit3,
  FiSend,
  FiLoader
} from "react-icons/fi";

import "./Write.css";

function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Title and Content cannot be empty");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Login required");
        return;
      }

      const response = await axios.post(
        "https://blog-verse-api.onrender.com/api/posts",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

      alert("Post Published Successfully");

      setTitle("");
      setContent("");
    } catch (err) {
      console.log(
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
        "Error publishing post"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="write-page">

      <section className="write-hero">

        <div className="hero-badge">
          <FiEdit3 />
          Story Editor
        </div>

        <h1>Create Stories That Matter</h1>

        <p>
          Share ideas, experiences, technology,
          creativity and knowledge with readers
          around the world.
        </p>

      </section>

      <div className="write-container">

        <form
          className="write-card"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            className="title-input"
            placeholder="Enter your title..."
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <textarea
            className="content-input"
            placeholder="Start writing your story..."
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
          />

          <div className="editor-footer">

            <span className="footer-text">
              Publish your thoughts to the community
            </span>

            <button
              type="submit"
              disabled={loading}
              className="publish-btn"
            >
              {loading ? (
                <>
                  <FiLoader className="spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <FiSend />
                  Publish Story
                </>
              )}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Write;