const { Server } = require("socket.io");

// Initialize Socket.IO on port 3000
const io = new Server(3000, {
  cors: {
    origin: "*", // Adjust this to match your client's URL for security
  }
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Listen for custom events from the client
  socket.on("message", (data) => {
    console.log("Received data:", data);
    
    // Broadcast message to all other connected clients
    socket.broadcast.emit("message", data);
  });

  // Handle client disconnects
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

console.log("Socket.IO server running on port 3000");
