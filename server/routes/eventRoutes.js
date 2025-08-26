import express from "express";
import { createEvent, getEvents, getEvent, updateEvent, deleteEvent } from "../controllers/eventController.js";
import { protect } from "../middlewares/authMiddleware.js"; // your JWT auth middleware

const router = express.Router();

router.post("/", protect, createEvent);
router.get("/", protect, getEvents);
router.get("/:id", protect, getEvent);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);

export default router;
