import express from 'express';
import { PrismaClient } from '@prisma/client/extension';
import cors from 'cors'
import router from './auth';

const app = express();
const prisma = new PrismaClient();
app.use("/auth", router);
app.use(cors()); 
app.use(express.json());

app.post('/api/users', async (req, res) => {
  const { name, email } = req.body; // Destructure the form data

  try {
    // Use Prisma to insert it into PostgreSQL
    const newUser = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json(newUser);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong saving the user.' });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));