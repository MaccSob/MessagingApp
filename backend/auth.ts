import pkg from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const { Router } = pkg;
import type { Request, Response } from "express";

const authRouter = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    const exists = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (exists) {
      const field = exists.email === email ? "email" : "username";
      return res.status(409).json({ field, message: `${field} already taken` });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { firstName, lastName, username, email, passwordHash: hashed },
    });

    res
      .cookie("token", jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" }), {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ user: { id: user.id, username: user.username } });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res
      .cookie("token", jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" }), {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ user: { id: user.id, username: user.username } });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
authRouter.get("/me", async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true, firstName: true, lastName: true, email: true },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("GET /auth/me:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default authRouter;