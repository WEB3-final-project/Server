import express from "express";
import { getSpeakerById } from "../controllers/speakers.controllers.js";

const router = express.Router();

router.get("/speakers/:id", getSpeakerById);

export default router;