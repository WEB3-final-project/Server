import express from "express";

import {
  getAuditLogs,
  getAuditLogById,
  deleteAuditLog,
} from "../controllers/auditLog.controllers.js";

import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/", authMiddleware, getAuditLogs);

router.get("/:id", authMiddleware, getAuditLogById);

router.delete("/:id", authMiddleware, deleteAuditLog);

export default router;