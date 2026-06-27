import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser(form);

if (data.accessToken) {
  login(data);
  navigate("/feed");
} else {
  alert(data.message || "Login failed");
}
    } catch (err) {
      console.log(err);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Welcome Back</h1>

        <p>
          Sign in and continue writing your story.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email Address"
            required
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <button type="submit">
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        <div className="auth-footer">
          Don't have an account?

          <Link to="/register">
            Register
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Login;