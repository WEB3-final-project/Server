import express from "express";
import { getAllEvents, getEventById } from "../controllers/events.controller.js";

const router = express.Router();

router.get("/events/:id", getEventById);
router.get("/events", getAllEvents)

export default router;