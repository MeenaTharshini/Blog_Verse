import { useEffect, useState } from "react";

import {
  getComments,
  addComment,
  likePost,
} from "../api/api";

import {
  FiHeart,
  FiMessageSquare,
  FiShare2,
  FiSend,
  FiClock,
  FiCalendar,
} from "react-icons/fi";

import "./PostCard.css";

function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes || 0);

  const [commentCount, setCommentCount] =
    useState(post.commentCount || 0);

  const [comments, setComments] = useState([]);

  const [commentText, setCommentText] =
    useState("");

  const [showComments, setShowComments] =
    useState(false);

  const [liking, setLiking] = useState(false);

  const [loadingComments, setLoadingComments] =
    useState(false);

  useEffect(() => {
    if (showComments) {
      loadComments();
    }
  }, [showComments]);

  const loadComments = async () => {
    try {
      setLoadingComments(true);

      const data = await getComments(post.id);

      const safeData = Array.isArray(data)
        ? data
        : [];

      setComments(safeData);

      setCommentCount(safeData.length);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleLike = async () => {
    if (liking) return;

    try {
      setLiking(true);

      const updated = await likePost(post.id);

      setLikes(updated.likes);
    } catch (err) {
      console.log(err);
    } finally {
      setLiking(false);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;

    try {
      await addComment({
        postId: post.id,
        text: commentText,
      });

      setCommentText("");

      setCommentCount(prev => prev + 1);

      loadComments();
    } catch (err) {
      console.log(err);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: post.title,
        text: post.content,
      });
    } catch {
      await navigator.clipboard.writeText(
        window.location.href
      );

      alert("Link copied!");
    }
  };

  const readingTime = Math.max(
    1,
    Math.ceil(
      (post.content?.split(" ").length || 0) /
        200
    )
  );

  return (
    <article className="post-card">

      <header className="post-header">

        <div className="avatar">
          {post.author?.charAt(0).toUpperCase()}
        </div>

        <div className="author-info">

          <h4>{post.author}</h4>

          <div className="post-meta">

            <span>
              <FiCalendar />
              {new Date(
                post.createdAt
              ).toLocaleDateString()}
            </span>

            <span>
              <FiClock />
              {readingTime} min read
            </span>

          </div>

        </div>

      </header>

      <h2 className="post-title">
        {post.title}
      </h2>

      <p className="post-content">
        {post.content}
      </p>

      <div className="post-actions">

        <button
          className="action-btn like-btn"
          onClick={handleLike}
          disabled={liking}
        >
          <FiHeart />
          <span>{likes}</span>
        </button>

        <button
          className="action-btn"
          onClick={() =>
            setShowComments(!showComments)
          }
        >
          <FiMessageSquare />
          <span>{commentCount}</span>
        </button>

        <button
          className="action-btn"
          onClick={handleShare}
        >
          <FiShare2 />
          <span>Share</span>
        </button>

      </div>

      {showComments && (
        <div className="comments-section">

          <div className="comments-header">
            <h4>Responses</h4>

            <span>{commentCount}</span>
          </div>

          {loadingComments ? (
            <div className="loading-comments">
              Loading responses...
            </div>
          ) : (
            <>
              <div className="comments-list">

                {comments.length === 0 ? (
                  <div className="empty-comments">
                    No responses yet
                  </div>
                ) : (
                  comments.map(comment => (
                    <div
                      key={comment.id}
                      className="comment"
                    >
                      <div className="comment-avatar">
                        {comment.userName
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="comment-body">

                        <div className="comment-user">
                          {comment.userName}
                        </div>

                        <div className="comment-text">
                          {comment.text}
                        </div>

                      </div>
                    </div>
                  ))
                )}

              </div>

              <div className="comment-input">

                <input
                  type="text"
                  value={commentText}
                  placeholder="Write a response..."
                  onChange={(e) =>
                    setCommentText(
                      e.target.value
                    )
                  }
                />

                <button
                  onClick={handleComment}
                >
                  <FiSend />
                </button>

              </div>
            </>
          )}

        </div>
      )}

    </article>
  );
}

export default PostCard;