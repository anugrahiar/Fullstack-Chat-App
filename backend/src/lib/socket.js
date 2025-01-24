// This code sets up a basic Express server with Socket.IO
//  for real-time, bidirectional communication between clients
//  and the server.

import { Server } from "socket.io";  // Imports the Socket.IO server class for real-time communication.
import http from "http";   // Node.js HTTP module, used to create a server.
import express from "express";   // Express framework for building APIs and serving static files.


const app = express();  
const server = http.createServer(app);// This creates an HTTP server using the http module, wrapping the Express app.
// This is necessary because Socket.IO needs a raw HTTP server to attach itself to.

const io = new Server(server,{     //This initializes the Socket.IO server (io) and attaches it to the HTTP server.
    cors: {
        origin: ["http://localhost:5173"]    //cors configuration specifies that only the specified origin (http://localhost:5173) is allowed to connect to the WebSocket server.
    }
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
  }

// used to store online users

const userSocketMap ={}; // {userId: socketId}   This is an object (or map) used to store the mapping between userId and their corresponding socket.id.

// This code establishes the basic functionality for managing client 
// connections and disconnections using Socket.IO. Here's a detailed breakdown:

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId

    if(userId) userSocketMap[userId] = socket.id

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));


    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, app, server };


//  io: Used to manage real-time WebSocket communication.
//  app: Used for defining API endpoints or middleware.
//  server: Used to listen for incoming HTTP requests.