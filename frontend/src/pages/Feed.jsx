import { useEffect, useState } from "react";
import { getFeed } from "../api/api";
import PostCard from "../components/PostCard";
import { FiSearch } from "react-icons/fi";
import "./Feed.css";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeed();
  }, []);

  useEffect(() => {
    const result = posts.filter(
      (post) =>
        post.title?.toLowerCase().includes(search.toLowerCase()) ||
        post.content?.toLowerCase().includes(search.toLowerCase()) ||
        post.author?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredPosts(result);
  }, [search, posts]);

  const loadFeed = async () => {
    try {
      const data = await getFeed();
      const safePosts = Array.isArray(data) ? data : [];

      setPosts(safePosts);
      setFilteredPosts(safePosts);
    } catch (err) {
      console.log("Feed Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalLikes = filteredPosts.reduce(
    (sum, post) => sum + (post.likes || 0),
    0
  );

  return (
    <div className="feed-page">

      <section className="feed-hero">

        <div className="hero-badge">
          Community Publishing Platform
        </div>

        <h1>
          Discover Stories Worth Reading
        </h1>

        <p>
          Explore ideas, experiences, technology,
          creativity, and knowledge shared by writers
          around the world.
        </p>

        <div className="search-box">
          <FiSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search stories, authors, topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      </section>

      {loading ? (
        <div className="loader">
          Loading stories...
        </div>
      ) : (
        <div className="feed-container">

          <div className="feed-list">

            {filteredPosts.length === 0 ? (
              <div className="empty-feed">
                <h2>No stories found</h2>

                <p>
                  Try a different search term.
                </p>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                />
              ))
            )}

          </div>

        </div>
      )}
    </div>
  );
}

export default Feed;