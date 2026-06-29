import express from "express";
import { getStats } from "../controllers/stats.controllers.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/", authMiddleware, getStats);

export default router;