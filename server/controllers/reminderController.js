// controllers/reminderController.js
import nodemailer from "nodemailer";
import Event from "../models/Event.js";
import User from "../models/User.js";

export const sendTaskReminders = async (req, res) => {
  try {
    const now = new Date();
    const next15Min = new Date(now.getTime() + 15 * 60000); // 15 min ahead

    // Find events ending in the next 15 min
    const tasks = await Event.find({
      endTime: { $gte: now, $lte: next15Min }
    }).populate("assignedTo", "email name");

    if (!tasks.length) {
      console.log("✅ No tasks to remind right now.");
      return res.json({ message: "No reminders to send" });
    }

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // or "outlook", "yahoo"
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Loop through tasks & send reminders
    for (const task of tasks) {
      if (!task.assignedTo || !task.assignedTo.email) continue;

      const mailOptions = {
        from: `"Task Manager" <${process.env.EMAIL_USER}>`,
        to: task.assignedTo.email,
        subject: `⏰ Reminder: Task "${task.title}" is ending soon!`,
        text: `Hello ${task.assignedTo.name},

This is a reminder that your task "${task.title}" is scheduled to end at ${task.endTime}.

Please make sure to complete it before the deadline. ✅

- Task Manager`,
      };

      await transporter.sendMail(mailOptions);
      console.log(`📧 Reminder sent to ${task.assignedTo.email}`);
    }

    res.json({ message: "Reminders sent successfully" });
  } catch (error) {
    console.error("❌ Error sending reminders:", error);
    res.status(500).json({ message: error.message });
  }
};
