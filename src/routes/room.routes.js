import { Router } from "express";

import * as roomController from "../controllers/room.controllers.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
const router = Router();

router.get("/", roomController.getRooms);

router.get("/:id", roomController.getRoom);

router.post("/", authMiddleware, roomController.createRoom);

router.put("/:id", authMiddleware, roomController.updateRoom);

router.delete("/:id", authMiddleware, roomController.deleteRoom);

export default router;