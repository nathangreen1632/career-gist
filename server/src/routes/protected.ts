import express from "express";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/homepage", authenticateToken, (req, res) => {
  res.json({ message: "Welcome to the dashboard!", user: req.user });
});

export default router;
