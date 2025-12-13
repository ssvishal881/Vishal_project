import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addLeave,
  getLeave,
  getLeaves,
  getLeaveDetail,
  updateLeave,
} from "../controllers/leaveController.js";

const router = express.Router();

// Get single leave detail — VIEW PAGE
router.get("/detail/:id", authMiddleware, getLeaveDetail);

// Update approve/reject
router.put("/:id", authMiddleware, updateLeave);

// Get leave by employeeId
router.get("/:id/:role", authMiddleware, getLeave);

// Get all leaves
router.get("/", authMiddleware, getLeaves);

// Add Leave
router.post("/add", authMiddleware, addLeave);

export default router;
