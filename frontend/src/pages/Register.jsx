import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { registerUser } from "../api/api";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await registerUser(form);

      if (
        data.message === "Registered" ||
        data.message === "User registered"
      ) {
        alert("Registration Successful");

        navigate("/login");
      } else {
        alert(data.message || "Registration Failed");
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

        <h1>Create Account</h1>

        <p>
          Join BlogVerse Elite and start publishing.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Full Name"
            required
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

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
            {loading ? "Creating..." : "Register"}
          </button>

        </form>

        <div className="auth-footer">
          Already have an account?

          <Link to="/login">
            Login
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Register;