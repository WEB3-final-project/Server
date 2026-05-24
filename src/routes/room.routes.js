import { Router } from "express";

import * as roomController from "../controllers/room.controllers.js";

const router = Router();

router.get("/", roomController.getRooms);

router.get("/:id", roomController.getRoom);

router.post("/", roomController.createRoom);

router.put("/:id", roomController.updateRoom);

router.delete("/:id", roomController.deleteRoom);

export default router;