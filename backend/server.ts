import pkg from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import authRouter from "./auth.js";
import conversationsRouter from "./conversations.js";
import { requireAuth } from "./middleware.js";

const app = pkg();
const httpServer = createServer(app);
const JWT_SECRET = process.env.JWT_SECRET!;



interface AuthSocket extends Socket {
  userId: number;
}

// ── Socket.io ────────────────────────────────────────────────
export const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL ?? "http://localhost:5173",
    credentials: true,
  },
});

io.use((socket, next) => {
  const authSocket = socket as AuthSocket;
  const rawCookie = authSocket.handshake.headers.cookie;
  const cookie = Array.isArray(rawCookie) ? rawCookie.join(";") : rawCookie ?? "";
  const match = cookie.match(/token=([^;]+)/);
  if (!match) return next(new Error("Not authenticated"));
  try {
    const payload = jwt.verify(match[1], JWT_SECRET) as { userId: number };
    authSocket.userId = payload.userId;
    next();
  } catch {
    next(new Error("Invalid token"));
  }
});

io.on("connection", (socket) => {
  const authSocket = socket as AuthSocket;
  console.log(`🔌 User ${authSocket.userId} connected`);

  authSocket.on("join_conversation", (conversationId: number) => {
    authSocket.join(`conversation:${conversationId}`);
  });

  authSocket.on("leave_conversation", (conversationId: number) => {
    authSocket.leave(`conversation:${conversationId}`);
  });

  authSocket.on("disconnect", () => {
    console.log(`🔌 User ${authSocket.userId} disconnected`);
  });
});

// ── Express ──────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL ?? "http://localhost:5173",
  credentials: true,
}));
app.use(pkg.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/conversations", requireAuth, conversationsRouter);

app.get("/ping", (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT;
httpServer.listen(PORT, () => console.log(`✅ running on http://localhost:${PORT}`));