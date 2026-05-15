import express from "express";
import { protect } from "../middlewares/protect.js";

import {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  getUserTrips,
} from "../controllers/trip.controller.js";
import { isTripOwner } from "../middlewares/authorize.js";
import {
  addMember,
  getMembers,
  removeMember,
} from "../controllers/member.controller.js";



const router = express.Router();

router.post("/", protect, createTrip);

router.get("/", protect, getTrips);

router.get("/me", protect, getUserTrips);

router.get("/:id", protect, getTripById);

router.put("/:id", protect, isTripOwner, updateTrip);

router.delete("/:id", protect, isTripOwner, deleteTrip);

// Member Routes
router.post("/:id/members", protect, isTripOwner, addMember);
router.get("/:id/members", protect, getMembers);
router.delete("/:id/members/:userId", protect, isTripOwner, removeMember);


export default router;