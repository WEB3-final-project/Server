import express from "express";
import { getEventById } from "../controllers/events.controller.js";

const router = express.Router();

router.get("/event/:id", getEventById);

export default router;