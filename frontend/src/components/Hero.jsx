import "./Hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <span className="hero-badge">
          🚀 Premium Blogging Platform
        </span>

        <h1>
          Write.
          <span> Share.</span>
          <span> Inspire.</span>
        </h1>

        <p>
          BlogVerse Elite empowers creators to publish ideas,
          connect with readers, build communities, and grow
          their digital presence through modern blogging.
        </p>

        <div className="hero-buttons">

          <Link
            to="/register"
            className="hero-btn primary"
          >
            Start Writing
          </Link>

          <Link
            to="/feed"
            className="hero-btn secondary"
          >
            Explore Articles
          </Link>

        </div>

      </div>

      <div className="hero-preview">

        <div className="preview-card">

          <div className="preview-header">
            Featured Story
          </div>

          <h3>
            The Future of Full Stack Development
          </h3>

          <p>
            Explore modern architectures,
            scalable systems, and AI-powered
            software development workflows.
          </p>

          <span>❤️ 248 Likes</span>

        </div>

      </div>

    </section>
  );
}

export default Hero;