import { Router } from "express";

import * as sessionController from "../controllers/session.controller.js";

const router = Router();

router.get("/", sessionController.getSessions);

router.get(
  "/live",
  sessionController.getLiveSessions
);

router.get(
  "/room/:roomId",
  sessionController.getSessionsByRoom
);

router.get("/:id", sessionController.getSession);

router.post(
  "/",
  sessionController.createSession
);

router.put(
  "/:id",
  sessionController.updateSession
);

router.delete(
  "/:id",
  sessionController.deleteSession
);

export default router;