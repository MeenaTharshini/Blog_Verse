import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  FiHome,
  FiBookOpen,
  FiEdit3,
  FiGrid,
  FiUser,
  FiLogOut,
  FiMoon,
  FiSun,
  FiMenu,
  FiX
} from "react-icons/fi";

function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path ? "active" : "";

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="navbar">

      <div className="navbar-inner">

        {/* LOGO */}

        <Link to="/" className="logo">
          <span className="logo-mark">B</span>
          <span>BlogVerse</span>
        </Link>

        {/* DESKTOP NAV */}

        {token && (
          <nav className="navbar-links">

            <Link
              to="/"
              className={isActive("/")}
            >
              <FiHome />
              Home
            </Link>

            <Link
              to="/feed"
              className={isActive("/feed")}
            >
              <FiBookOpen />
              Feed
            </Link>

            <Link
              to="/write"
              className="write-link"
            >
              <FiEdit3 />
              Write
            </Link>

            <Link
              to="/my-posts"
              className={isActive("/my-posts")}
            >
              <FiUser />
              My Posts
            </Link>

            <Link
              to="/dashboard"
              className={isActive("/dashboard")}
            >
              <FiGrid />
              Dashboard
            </Link>

          </nav>
        )}

        {/* RIGHT */}

        <div className="navbar-right">

          <button
            className="theme-btn"
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            {darkMode ? (
              <FiSun />
            ) : (
              <FiMoon />
            )}
          </button>

          {!token ? (
            <div className="auth-buttons">

              <Link
                to="/login"
                className="login-btn"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="register-btn"
              >
                Get Started
              </Link>

            </div>
          ) : (
            <div className="user-area">

              <div className="avatar">
                {user?.name?.charAt(0)
                  ?.toUpperCase() || "U"}
              </div>

              <button
                onClick={logout}
                className="logout-btn"
              >
                <FiLogOut />
              </button>

            </div>
          )}

          <button
            className="mobile-toggle"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            {menuOpen ? (
              <FiX />
            ) : (
              <FiMenu />
            )}
          </button>

        </div>

      </div>

      {/* MOBILE MENU */}

      {menuOpen && token && (
        <div className="mobile-menu">

          <Link to="/">
            <FiHome />
            Home
          </Link>

          <Link to="/feed">
            <FiBookOpen />
            Feed
          </Link>

          <Link to="/write">
            <FiEdit3 />
            Write
          </Link>

          <Link to="/my-posts">
            <FiUser />
            My Posts
          </Link>

          <Link to="/dashboard">
            <FiGrid />
            Dashboard
          </Link>

        </div>
      )}

    </header>
  );
}

export default Navbar;