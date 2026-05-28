
import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

router.post("/register", async (req: Request, res: Response) => {
  const { firstName, lastName, username, email, password } = req.body;

  const exists = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });
  if (exists) {
    const field = exists.email === email ? "email" : "nickname";
    return res.status(409).json({ field, message: `${field} already taken` });
  }

  const hashed = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { firstName, lastName, username, email, passwordHash: hashed },
  });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
  res.status(201).json({ token, user: { id: user.id, nickname: user.username } });
});


router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id: user.id, nickname: user.passwordHash } });
});

export default router;
