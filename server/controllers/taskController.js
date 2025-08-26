import Event from "../models/Event.js";
import User from "../models/User.js";
// Get Tasks assigned to me or created by me
export const getMyTasks = async (req, res) => {
  try {
    const tasks = await Event.find({
      $or: [
        { assignedTo: req.user.id },  // assigned to logged-in user
        { createdBy: req.user.id }    // created by logged-in user
      ]
    })
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email")
    .sort({ date: 1, startTime: 1 }); // optional: sort by date/time

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const task = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const task = await Event.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body; // expected status in request body

    // validate status values if needed
    const allowedStatuses = ["pending", "in-progress", "completed", "cancelled"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const task = await Event.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({
      message: "Task status updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};