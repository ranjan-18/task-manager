import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userController from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// Load env vars
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",  // frontend URL
  credentials: true
}));
app.use(express.json());

// Routes

app.use('/api/user',userController);
app.use('/api/events',eventRoutes);
app.use('/api/task',taskRoutes);


import cron from "node-cron";
import { sendTaskReminders } from "./controllers/reminderController.js";

// Run every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  console.log("🔔 Checking for reminders...");
  await sendTaskReminders({ query: {} }, { json: () => {} });
});

app.get("/", (req, res) => {
  res.send("Task Manager API is running...");
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
