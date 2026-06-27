import { useEffect, useState } from "react";
import {
  FiFileText,
  FiHeart,
  FiMessageSquare,
  FiTrendingUp,
  FiEdit3,
} from "react-icons/fi";

import { Link } from "react-router-dom";
import { getDashboard } from "../api/api";

import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
  try {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) return;

    const data = await getDashboard(
      user.id
    );

    console.log("Dashboard Data:", data);

    setStats(data);

  } catch (err) {

    console.log(err);

    setStats({
      totalPosts: 0,
      totalLikes: 0,
      totalComments: 0,
      engagementScore: 0,
      recentPosts: [],
    });

  }
};

  if (!stats) {
    return (
      <div className="dashboard-loader">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      <section className="dashboard-hero">

        <div className="hero-badge">
          Creator Analytics
        </div>

        <h1>Your Dashboard</h1>

        <p>
          Track your content performance
          and monitor audience engagement.
        </p>

      </section>

      <div className="dashboard-container">

        <div className="stats-grid">

          <div className="stat-card">
            <FiFileText />
            <h3>{stats.totalPosts}</h3>
            <span>Total Posts</span>
          </div>

          <div className="stat-card">
            <FiHeart />
            <h3>{stats.totalLikes}</h3>
            <span>Total Likes</span>
          </div>

          <div className="stat-card">
            <FiMessageSquare />
            <h3>{stats.totalComments}</h3>
            <span>Total Comments</span>
          </div>

          <div className="stat-card">
            <FiTrendingUp />
            <h3>{stats.engagementScore}</h3>
            <span>Engagement</span>
          </div>

        </div>

        <div className="dashboard-bottom">

          <div className="overview-card">

            <h2>Performance Summary</h2>

            <p>
              You have published
              <strong> {stats.totalPosts} </strong>
              articles receiving
              <strong> {stats.totalLikes} </strong>
              likes and
              <strong> {stats.totalComments} </strong>
              comments.
            </p>

          </div>

          <div className="overview-card">

            <h2>Quick Action</h2>

            <Link
              to="/write"
              className="write-link"
            >
              <FiEdit3 />
              Create New Story
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;