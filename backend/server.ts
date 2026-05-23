import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client/extension';
import cors from 'cors'

const app = express();
const prisma = new PrismaClient();

app.use(cors()); 
app.use(express.json());

// Get all users from PostgreSQL
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(51214, () => console.log('Server running on http://localhost:51214'));