const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getComments,
  createComment,
} = require("../controllers/commentController");

router.get("/:postId", getComments);
router.post("/", auth, createComment);

module.exports = router;