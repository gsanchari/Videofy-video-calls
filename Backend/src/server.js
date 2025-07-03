import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";

import cors from "cors";      //to allow cross-origin requests -from frontend to backend

import path from "path";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js"

import { connectDB } from "./lib/db.js"

const app = express();
const PORT = process.env.PORT

const __dirname = path.resolve();

//frontend react origin
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true, //allow frontend to send the cookies 
}))

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));

    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"))
    });
}

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
    connectDB();
})