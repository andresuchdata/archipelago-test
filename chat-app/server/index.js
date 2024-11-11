const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://simple-chat-arch.s3-website-ap-southeast-1.amazonaws.com",
      "https://simple-chat-be.andresuchitra.com"
    ],
    methods: ["GET", "POST"]
  },
  allowEIO3: true,
  transports: ['websocket', 'polling']
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

// Add a basic route for the root path
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Chat server is running' });
});

// Add a health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});