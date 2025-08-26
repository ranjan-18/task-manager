import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userController from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cron from "node-cron";
import { sendTaskReminders } from "./controllers/reminderController.js";

// Load env vars
dotenv.config();

const app = express();

// ------------------ CORS Setup ------------------

// Allow multiple origins (dev + production)
const allowedOrigins = [
  "http://localhost:5173", // dev
  process.env.CLIENT_URL   // production frontend (Vercel)
];

app.use(cors({
  origin: function(origin, callback){
    // allow non-browser requests (Postman, curl)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      return callback(new Error("CORS error: Origin not allowed"), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"]
}));

// Parse JSON
app.use(express.json());

// ------------------ Database ------------------
connectDB();

// ------------------ Routes ------------------
app.use('/api/user', userController);
app.use('/api/events', eventRoutes);
app.use('/api/task', taskRoutes);

// ------------------ Cron Job ------------------
cron.schedule("*/5 * * * *", async () => {
  console.log("🔔 Checking for reminders...");
  await sendTaskReminders({ query: {} }, { json: () => {} });
});

// Health check
app.get("/", (req, res) => {
  res.send("Task Manager API is running...");
});

// ------------------ Server ------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
