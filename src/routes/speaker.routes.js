import express from "express";
import { getSpeakerById, getAllSpeakers } from "../controllers/speakers.controllers.js";

const router = express.Router();

router.get("/:id", getSpeakerById);
router.get('/', getAllSpeakers);
export default router;