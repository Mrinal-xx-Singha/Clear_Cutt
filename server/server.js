import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/mongo.db.js";
import userRouter from "./routes/user.routes.js";

// App Config
const PORT = process.env.PORT || 4000;
const app = express();
await connectDB() 

// Initialize Middleware
app.use(express.json());
app.use(cors()); 

// API Routes
app.get("/", (req, res) => res.send("API WORKING 🎉"));
app.use("/api/user",userRouter)

// Start the server
app.listen(PORT, () => console.log("Server Running on port ✅ " + PORT));
