import express from "express";
import { getSpeakerById } from "../controllers/speaker.controllers.js";

const router = express.Router();

router.get("/speakers/:id", getSpeakerById);

export default router;