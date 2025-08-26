import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String },
  type: { type: String, enum: ["task", "meeting"], required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true }, // e.g., "10:00"
  endTime: { type: String, required: true },
  weekOf: { type: String }, // optional, e.g., "Week 1"
  color: { type: String, enum: ["blue", "green", "yellow", "red"], default: "blue" },
  note: { type: String },
  status: { type: String, enum: ["Pending", "Done"], default: "Pending" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  repeat: { type: String, enum: ["none", "daily", "weekly", "monthly"], default: "none" },
  reminder: { type: Array, default: ["none"], required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
