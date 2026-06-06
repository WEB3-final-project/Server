import express from "express";
import { getAllEvents, getEventById, createNewEvent, updateEventById, deleteEvent } from "../controllers/events.controllers.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
const router = express.Router();

router.get("/:id", getEventById);
router.get("/", getAllEvents)
router.post(
  "/",
  authMiddleware,
  createNewEvent
);

router.put(
  "/:id",
  authMiddleware,
  updateEventById
);

router.delete(
  "/:id",
  authMiddleware,
  deleteEvent
);

export default router;