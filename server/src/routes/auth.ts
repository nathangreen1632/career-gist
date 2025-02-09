import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const users = [
  { id: 1, username: "testuser", password: bcrypt.hashSync("password123", 12) }
];

router.post("/login", (req: express.Request, res: express.Response): void => {
  const { username, password } = req.body as { username: string; password: string };
  if (!username || !password) {
    res.status(400).json({ error: "Username and password required" });
    return;
  }

  const user = users.find((u) => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
     res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: "1h" });

   res.json({ message: "Login successful", token });
  return;
});

export default router;
