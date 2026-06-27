import { useEffect, useState } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiSave,
  FiX,
  FiCalendar,
  FiClock
} from "react-icons/fi";

import {
  getMyPosts,
  updatePost,
  deletePost,
} from "../api/api";

import "./MyPosts.css";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await getMyPosts();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
  };

  const saveEdit = async () => {
    try {
      await updatePost(editingId, title, content);
      cancelEdit();
      loadPosts();
    } catch (err) {
      alert("Failed to update post");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this article?"))
      return;

    try {
      await deletePost(id);
      loadPosts();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="myposts-page">

      <section className="myposts-hero">

        <div className="hero-badge">
          Personal Publishing Space
        </div>

        <h1>My Articles</h1>

        <p>
          Manage, update and organize all
          your published stories from one place.
        </p>

      </section>

      <div className="myposts-container">

        {loading ? (
          <div className="loader">
            Loading articles...
          </div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <h2>No Articles Found</h2>
            <p>
              Start publishing stories to see
              them here.
            </p>
          </div>
        ) : (
          <div className="myposts-grid">

            {posts.map((post) => {

              const readingTime = Math.max(
                1,
                Math.ceil(
                  (post.content?.split(" ").length || 0) /
                    200
                )
              );

              return (
                <div
                  key={post.id}
                  className="mypost-card"
                >

                  {editingId === post.id ? (
                    <>

                      <input
                        className="edit-title"
                        value={title}
                        onChange={(e) =>
                          setTitle(e.target.value)
                        }
                      />

                      <textarea
                        className="edit-content"
                        value={content}
                        onChange={(e) =>
                          setContent(e.target.value)
                        }
                      />

                      <div className="actions">

                        <button
                          className="save-btn"
                          onClick={saveEdit}
                        >
                          <FiSave />
                          Save
                        </button>

                        <button
                          className="cancel-btn"
                          onClick={cancelEdit}
                        >
                          <FiX />
                          Cancel
                        </button>

                      </div>

                    </>
                  ) : (
                    <>

                      <h2>{post.title}</h2>

                      <p className="content">
                        {post.content}
                      </p>

                      <div className="meta">

                        <span>
                          <FiCalendar />
                          {new Date(
                            post.createdAt
                          ).toLocaleDateString()}
                        </span>

                      </div>

                      <div className="actions">

                        <button
                          className="edit-btn"
                          onClick={() =>
                            startEdit(post)
                          }
                        >
                          <FiEdit2 />
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(post.id)
                          }
                        >
                          <FiTrash2 />
                          Delete
                        </button>

                      </div>

                    </>
                  )}

                </div>
              );
            })}

          </div>
        )}

      </div>

    </div>
  );
}

export default MyPosts;