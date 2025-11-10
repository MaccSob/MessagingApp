import express from 'express';
import http from 'http';
import {Server} from 'socket.io';


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: "http://localhost:5173",
        methods: ['GET','POST']
    }
})

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle new messages
  socket.on('chat message', (msg) => {
    console.log('Message received:', msg);
    // Broadcast the message to all connected clients
      io.emit('chat message', msg);
    });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});