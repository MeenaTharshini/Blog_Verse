const bcrypt = require("bcryptjs");

const {
  getUsers,
  saveUser,
} = require("../services/userService");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/token");

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const users = getUsers();

    const exists = users.find((u) => u.email === req.body.email);
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(req.body.password, 10);

    const user = {
  id: String(Date.now()), // 🔥 FORCE STRING
  name: req.body.name,
  email: req.body.email,
  password: hashed,
};

    saveUser(user);

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const users = getUsers();

    const user = users.find((u) => u.email === email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return res.json({
      accessToken,
      refreshToken,
      user: {
        id: String(user.id), // 🔥 FORCE STRING (FIX)
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);

    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};