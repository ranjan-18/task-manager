import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",  // or smtp provider
  auth: {
    user: process.env.EMAIL_USER,  // your email
    pass: process.env.EMAIL_PASS,  // your app password
  },
});

export const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log("✅ Reminder sent to", to);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};
