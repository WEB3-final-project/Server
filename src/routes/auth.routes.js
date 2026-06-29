import express from 'express';
import { 
    login,
    signUp,
    logout,
    checkLoginToken

} from '../controllers/auth.controllers.js';
import { authMiddleware } from '../middlewares/auth.middlewares.js';
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/signup",upload.single("photo_url"), signUp);
router.post("/login", login);
router.delete("/logout", authMiddleware, logout);
router.post("/refresh", checkLoginToken);

export default router;