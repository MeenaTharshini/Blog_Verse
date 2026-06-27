require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dashboardRoutes =require("./routes/dashboard");
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/feed", require("./routes/feed"));
app.use("/api/comments", require("./routes/comments"));
app.use(
  "/api/dashboard",
  dashboardRoutes
);
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});