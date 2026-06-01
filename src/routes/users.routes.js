import express from 'express';
import {
    deletePermanently ,
    deleteTemporarily
} from '../controllers/auth.controllers.js';
import { authMiddleware } from "../middlewares/auth.middlewares.js"
import { uploadPhoto } from '../controllers/users.controller.js';
import { upload } from "../middlewares/upload.middlewares.js";

const router = express.Router();

router.patch("/users/:id/photo", upload.single("photo_url"), uploadPhoto);
router.delete("/users", authMiddleware, deletePermanently);
router.delete("/users/temp", authMiddleware, deleteTemporarily);

export default router;