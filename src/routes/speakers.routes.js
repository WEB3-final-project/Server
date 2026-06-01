import express from "express";
import {
    getSpeakerById,
    getAllSpeakers,
    deleteSpeakerById,
    updateSpeakerById,
    createSpeaker
} from "../controllers/speakers.controllers.js";

import { authMiddleware } from "../middlewares/auth.middlewares.js"

const router = express.Router();

router.get("/:id", getSpeakerById);
router.get('/', getAllSpeakers);
router.post("/", authMiddleware, createSpeaker);
router.delete("/:id", authMiddleware, deleteSpeakerById);
router.put("/:id", authMiddleware, updateSpeakerById);

export default router;