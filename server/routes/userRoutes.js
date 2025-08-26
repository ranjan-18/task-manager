import express from "express";
// import { registerUser, verifyEmail, loginUser } from "../controllers/userController.js";
import { registerUser, loginUser, logoutUser, getAllUsers } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
// router.get("/verify/:token", verifyEmail);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get('/',protect ,getAllUsers);

export default router;
