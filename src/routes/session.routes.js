import { Router } from "express";

import * as sessionController from "../controllers/session.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
const router = Router();

router.get("/", sessionController.getSessions);

router.get(
  "/live",
  sessionController.getLiveSessions
);

router.get(
  "/upcoming",
  sessionController.getUpcomingSessions
)

router.get(
  "/past",
  sessionController.getPastSessions
);

router.get(
  "/room/:roomId",
  sessionController.getSessionsByRoom
);

router.get(
  "/:id",
  sessionController.getSession
);

router.post(
  "/",
  authMiddleware,
  sessionController.createSession
);

router.put(
  "/:id",
  authMiddleware,
  sessionController.updateSession
);

router.delete(
  "/:id",
  authMiddleware,
  sessionController.deleteSession
);

export default router;