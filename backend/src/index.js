import express from "express"
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import cors from "cors"   //   CORS (Cross-Origin Resource Sharing) is used to enable communication between the frontend and backend when they are hosted on different domains (origins).

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"; 
import { app, server } from "./lib/socket.js";

dotenv.config();


const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());// allow to extract json data to the body
app.use(cookieParser());   // allow you to parse the cookie for the auth middleware for profile update
app.use(cors({
    origin: "http://localhost:5173",   // react browser (frontend)
    credentials: true   // cookies be send along with every request

}
));

app.use("/api/auth", authRoutes);  // for authentication
app.use("/api/messages", messageRoutes);  // for messages

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

server.listen(PORT,()=>{    // reason why use server in place of app This allows Socket.IO to attach to the same HTTP server and handle both HTTP and WebSocket connections.
    console.log("server is running on PORT:" + PORT);
    connectDB();
})