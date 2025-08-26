// filepath: routes/reminderRoutes.js
import express from "express";
import { sendReminder } from "../controllers/reminderController.js";
import { protect } from "../middleware/authMiddleware.js"; // JWT auth middleware

const router = express.Router();

router.post("/send", protect, sendReminder);

export default router;
