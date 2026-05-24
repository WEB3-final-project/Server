import express from "express";
import {
    getSpeakerById,
    getAllSpeakers,
    deleteSpeakerById,
    updateSpeakerById,
    createSpeaker
} from "../controllers/speakers.controllers.js";

const router = express.Router();

router.get("/:id", getSpeakerById);
router.get('/', getAllSpeakers);
router.post("/", createSpeaker);
router.delete("/:id", deleteSpeakerById);
router.put("/:id", updateSpeakerById);
export default router;