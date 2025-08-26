import Event from "../models/Event.js";
import User from "../models/User.js";

// Create Event
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      company,
      type,
      date,
      startTime,
      endTime,
      weekOf,
      color,
      note,
      assignedTo,
      repeat,
      reminder,
    } = req.body;

    // Check if assigned user exists
    const user = await User.findById(assignedTo);
    if (!user) return res.status(400).json({ message: "Assigned user not found" });

    const event = await Event.create({
      title,
      company,
      type,
      date,
      startTime,
      endTime,
      weekOf,
      color,
      note,
      assignedTo,
      repeat,
      reminder,
      createdBy: req.user.id, // from auth middleware
    });

    res.status(201).json({ message: "Event created successfully", event });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("assignedTo", "name email");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Event
export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("assignedTo", "name email");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event updated", event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
