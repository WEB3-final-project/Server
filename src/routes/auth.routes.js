import express from 'express';
import { 
    login,
    signUp ,
    deletePermanently ,
    deleteTemporarily,
    logout,
    checkLoginToken

} from '../controllers/auth.controllers.js';
import { authMiddleware } from '../middlewares/auth.middlewares.js';
import { upload } from "../middlewares/upload.middlewares.js";
const authRoute = express.Router();

authRoute.post("/signup", upload.single("photo_url"), signUp);
authRoute.post("/login", login);
authRoute.delete("/user", authMiddleware, deletePermanently);
authRoute.delete("/user/temp", authMiddleware, deleteTemporarily);
authRoute.delete("/logout", authMiddleware, logout);
authRoute.post("/auth/refresh", checkLoginToken);

export default authRoute;