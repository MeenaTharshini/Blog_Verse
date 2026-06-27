import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const text = "Write. Share. Inspire.";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 90); // typing speed

      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <div className="home">

      <div className="hero">

        <div className="hero-badge">
          ✨ Welcome to BlogVerse Elite
        </div>

        <h1>
          {displayText}
          <span className="cursor">|</span>
        </h1>

        <p>
          A modern platform to create beautiful blogs, share ideas,
          and connect with the world.
        </p>

        <div className="hero-buttons">
          <Link to="/feed" className="btn primary">
            Explore Feed
          </Link>

          <Link to="/write" className="btn secondary">
            Start Writing
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Home;