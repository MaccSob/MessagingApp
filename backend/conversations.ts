import pkg from "express";
import { PrismaClient } from "@prisma/client";
import { io } from "./sockets";
import type { Request, Response } from "express";
import type { AuthRequest } from "./middleware";

const { Router } = pkg;
const router = Router();
const prisma = new PrismaClient();

// GET /conversations
router.get("/", async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).userId;
    const conversations = await prisma.conversation.findMany({
      where: { OR: [{ userAId: userId }, { userBId: userId }] },
      include: {
        userA: { select: { id: true, username: true, firstName: true, lastName: true } },
        userB: { select: { id: true, username: true, firstName: true, lastName: true } },
        messages: { orderBy: { createdAt: "desc" }, take: 1 },
      },
    });
    const shaped = conversations
      .map((c) => ({
        id: c.id,
        otherUser: c.userAId === userId ? c.userB : c.userA,
        lastMessage: c.messages[0] ?? null,
        createdAt: c.createdAt,
      }))
      .sort((a, b) => {
        const aTime = a.lastMessage?.createdAt ?? a.createdAt;
        const bTime = b.lastMessage?.createdAt ?? b.createdAt;
        return new Date(bTime).getTime() - new Date(aTime).getTime();
      });
    res.json(shaped);
  } catch (err) {
    console.error("GET /conversations:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /conversations/:id/messages
router.get("/:id/messages", async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).userId;
    const conversationId = parseInt(req.params.id as string);
    const conversation = await prisma.conversation.findFirst({
      where: { id: conversationId, OR: [{ userAId: userId }, { userBId: userId }] },
    });
    if (!conversation) return res.status(403).json({ message: "Not your conversation" });
    const messages = await prisma.message.findMany({
      where: { conversationId },
      include: { author: { select: { id: true, username: true } } },
      orderBy: { createdAt: "asc" },
    });
    res.json(messages);
  } catch (err) {
    console.error("GET /conversations/:id/messages:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /conversations
router.post("/", async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).userId;
    const { targetUsername } = req.body;
    const targetUser = await prisma.user.findUnique({ where: { username: targetUsername } });
    if (!targetUser) return res.status(404).json({ message: "User not found" });
    if (targetUser.id === userId) return res.status(400).json({ message: "Cannot message yourself" });
    const [userAId, userBId] = userId < targetUser.id
      ? [userId, targetUser.id]
      : [targetUser.id, userId];
    const conversation = await prisma.conversation.upsert({
      where: { userAId_userBId: { userAId, userBId } },
      create: { userAId, userBId },
      update: {},
    });
    res.status(201).json(conversation);
  } catch (err) {
    console.error("POST /conversations:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /conversations/:id/messages
router.post("/:id/messages", async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).userId;
    const conversationId = parseInt(req.params.id as string);
    const { content } = req.body;
    if (!content?.trim()) return res.status(400).json({ message: "Message cannot be empty" });
    const conversation = await prisma.conversation.findFirst({
      where: { id: conversationId, OR: [{ userAId: userId }, { userBId: userId }] },
    });
    if (!conversation) return res.status(403).json({ message: "Not your conversation" });
    const message = await prisma.message.create({
      data: { content: content.trim(), authorId: userId, conversationId },
      include: { author: { select: { id: true, username: true } } },
    });

    io.to(`conversation:${conversationId}`).emit("new_message", message);

    res.status(201).json(message);
  } catch (err) {
    console.error("POST /conversations/:id/messages:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;