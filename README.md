# JOFFY 💬

Real-time direct messaging app built with React, Express, Prisma, PostgreSQL and Socket.io.

## Stack

| | |
|---|---|
| Frontend | Vite + React + TypeScript |
| Backend | Express + TypeScript |
| Database | PostgreSQL via Prisma |
| Real-time | Socket.io |
| Auth | JWT via httpOnly cookies |

## Getting started

**Backend**
```bash
cd backend
npm install
# create .env with DATABASE_URL, JWT_SECRET, CLIENT_URL
npx prisma migrate dev
npx ts-node-dev --respawn server.ts
```

**Frontend**
```bash
cd frontend
npm install
# create .env with VITE_API_URL=http://localhost:4000
npm run dev
```

## Features

- Register / login with secure cookie sessions
- Real-time DMs via Socket.io rooms
- Start conversations by username
- Conversation list with last message preview

## License
MIT
