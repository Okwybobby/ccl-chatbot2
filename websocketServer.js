const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A client connected');
  
  // Example: Listen for message event from client
  socket.on('message', (data) => {
    // Broadcast the received message to all clients
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

server.listen(3001, () => {
  console.log('WebSocket server running on port 3001');
});