import express from "express";
import { getAllEvents, getEventById, createNewEvent, updateEventById, deleteEvent } from "../controllers/events.controllers.js";

const router = express.Router();

router.get("/:id", getEventById);
router.get("/", getAllEvents)
router.post(
  "/",
  createNewEvent
);

router.put(
  "/:id",
  updateEventById
);

router.delete(
  "/:id",
  deleteEvent
);

export default router;