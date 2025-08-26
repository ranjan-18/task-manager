import express from "express";
import { getMyTasks, updateTask, deleteTask, updateTaskStatus } from "../controllers/taskController.js";
import { protect } from "../middlewares/authMiddleware.js"; // JWT auth middleware

const router = express.Router();

// CRUD routes

router.get("/mytasks", protect, getMyTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
router.patch("/:id/status", updateTaskStatus);

export default router;
