# 💬 Joffy - Real-Time Enterprise Messaging Platform

> A modern, full-stack, bi-directional instant messaging application built to simulate scalable workplace communication networks like Slack or Discord.

## 📌 About The Project
Joffy is a feature-rich chat platform designed to handle persistent, real-time data flow with zero-latency. Moving away from standard request-response HTTP architectures, this application focuses heavily on persistent WebSocket connections, secure session tracking across stateful protocols, and decoupled data layers. It showcases advanced full-stack capabilities including asynchronous event loops, component rendering optimization, and NoSQL document modeling.

## 🛠️ Tech Stack
*   **Frontend:** React.js, SCSS / Sass (Modular & BEM structure)
*   **Backend:** Node.js, Express.js
*   **Real-Time Layer:** Socket.io (WebSockets)
*   **Database:** MongoDB (with Mongoose ODM)
*   **Authentication:** Passport.js (Secure Session Management)

## 🌟 Advanced Engineering Features
*   🔌 **Bi-Directional Communication:** Real-time event transport pipeline powered by Socket.io, handling messaging events instantly without API polling.
*   🔐 **Cross-Protocol Authentication:** Unified session validation ensuring active Passport.js auth states are securely verified during the WebSocket connection handshake.
*   📊 **Scalable NoSQL Schema:** Heavily optimized MongoDB schemas supporting indexed relations between Users, Rooms (Channels), and Messages.
*   🎨 **Sass Architecture:** Professional styles written using SCSS mixins, variables, and nesting rules for high maintainability.

## 🚀 How to Run Locally

### Prerequisites
* Node.js (v18+)
* MongoDB Instance (Local or Atlas cloud cluster)
* Git

### Quick Start
1. Clone the repository:
   ```bash
   git clone github.com
   ```
2. Navigate to the project root directory:
   ```bash
   cd MessagingApp
   ```
3. Install dependencies for both Backend and Frontend:
   ```bash
   npm install
   # If frontend is nested, navigate to your client folder and run: npm install
   ```
4. Setup your environment variables (`.env`):
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/joffy_db
   SESSION_SECRET=your_production_secret_key
   ```
5. Run the dev suite:
   ```bash
   npm run dev
   ```

## 📈 Engineering Challenges & Architecture Blueprint
*   **The WebSocket Authentication Dilemma:** Solved the challenge of sharing authentication states between the standard Express HTTP server session and the detached Socket.io environment, preventing unauthenticated connection spam.
*   **State Consistency in React:** Designed a clean, centralized event handling system on the client side to append incoming socket messages to the React component state smoothly, avoiding memory leaks and unnecessary re-renders.
