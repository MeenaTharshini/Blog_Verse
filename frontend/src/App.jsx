import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Write from "./pages/Write";
import MyPosts from "./pages/MyPosts";
import EditPost from "./pages/EditPost";

import "./App.css";
import "./styles/theme.css";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Oops! Page not found.</p>
    </div>
  );
}

function App() {
  // ✅ THEME STATE (IMPORTANT FIX)
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  return (
    <div className="app">

      {/* NAVBAR (FIXED: PASS PROPS) */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* MAIN CONTENT */}
      <div className="app-content">
        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROTECTED */}
          <Route
            path="/write"
            element={
              <ProtectedRoute>
                <Write />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-posts"
            element={
              <ProtectedRoute>
                <MyPosts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-post/:id"
            element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;