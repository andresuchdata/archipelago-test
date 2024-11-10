const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://simple-chat-arch.s3-website-ap-southeast-1.amazonaws.com"
    ],
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
  
    socket.on('chat-message', (message) => {
      // Only broadcast to other clients, not back to sender
      socket.broadcast.emit('chat-message', message);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

const PORT = 3000;

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});