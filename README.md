# 💬 Joffy - Real-Time Enterprise Messaging Platform

> A modern, full-stack, bi-directional instant messaging application built to simulate scalable workplace communication networks like Slack or Discord.

## 📌 About The Project
Joffy is a feature-rich chat platform designed to handle persistent, real-time data flow with zero latency. Moving away from legacy session-based polling, this architecture focuses heavily on persistent WebSocket connections, contract-driven TypeScript development, and bulletproof security. The system utilizes real-time event loops, an analytical relational database layer, and strict server-side authentication guards.

## 🛠️ Tech Stack

### 🎨 Frontend (Client)
*   **Core:** React.js (v19 with React Compiler enabled), TypeScript
*   **Build Tool:** Vite (High-performance HMR development)
*   **Styling:** Modern Modular CSS / SASS

### 🖥️ Backend (Server)
*   **Runtime & Framework:** Node.js, Express.js (Strict TypeScript configuration)
*   **Real-Time Transport:** Socket.io (WebSockets Architecture)
*   **Database & ORM:** PostgreSQL (Relational schema modeling via Prisma ORM v5.22.0)
*   **Security & Auth:** Stateless JSON Web Tokens (JWT) stored via Secure, HTTP-Only Cookies

## 🌟 Advanced Engineering Features
*   🔌 **Bi-Directional Event Tunneling:** Persistent, low-latency client-server state sync powered by Socket.io, bypassing traditional HTTP request overhead.
*   🔐 **CORS & Cookie-Based JWT Auth:** Production-ready authentication architecture leveraging HTTP-Only, SameSite cookies to protect client state against XSS and CSRF token interception.
*   🚦 **WebSocket Connection Guards:** Custom Socket.io middleware that intercepts incoming connection handshakes, dynamically decoding the HTTP-Only cookie to reject unauthenticated transport frames.
*   🗄️ **Relational Schema Integrity:** Heavily optimized PostgreSQL architecture mapping granular, indexed relationship data between Users, Channels, and Messages using type-safe Prisma client.


## 📈 Engineering Challenges & Architecture Decisions
*   **Decoupling Auth from Black-Box Frameworks:** Opted out of Passport.js in favor of custom JWT-in-Cookie middleware. This decision simplifies the integration with decoupled protocol contexts (HTTP routes vs isolated WebSockets handshakes).
*   **Database Synchronization Locks:** Relied on PostgreSQL transaction isolation levels via Prisma to safely stream incoming concurrent message flows without structural buffer blocking.
