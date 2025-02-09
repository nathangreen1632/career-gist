import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Access denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token!, process.env.JJWT_SECRET_KEY as string) as object | JwtPayload;
    if (typeof decoded === "object" && decoded !== null && "username" in decoded) {
        req.user = decoded as JwtPayload & { username: string }; // Attach user info to request
    } else {
        throw new Error("Invalid token payload");
    }
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
    return;
  }
};