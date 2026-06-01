import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./auth"

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get("/ping", (_req, res) => res.json({ ok: true })); // test route

app.use("/auth", authRouter);

app.listen(4000, () => console.log("✅ running on http://localhost:4000"));