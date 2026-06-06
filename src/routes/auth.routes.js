import express from 'express';
import { 
    login,
    signUp,
    logout,
    checkLoginToken

} from '../controllers/auth.controllers.js';
import { authMiddleware } from '../middlewares/auth.middlewares.js';
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.delete("/logout", authMiddleware, logout);
router.post("/refresh", checkLoginToken);

export default router;