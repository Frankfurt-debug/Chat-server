import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("✅ User connected");

  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Chat server is running!");
});

server.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
