import express from "express";
import helloRoutes from "./routes/hello.routes.js";
import eventsRoutes from "./routes/events.routes.js";
import speakersRoutes from "./routes/speakers.routes.js"
import authRoute from "./routes/auth.routes.js";
import roomRoutes from "./routes/room.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import questionRoutes from "./routes/question.routes.js";
import usersRoutes from "./routes/users.routes.js"

import { errorHandler } from "./middlewares/error.middlewares.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Bloqué par CORS : Origine non autorisée'));
    }
  },
  credentials: true
}));

app.use(cookieParser()); 
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoute);
app.use("/api/user", usersRoutes)
app.use("/api", helloRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/speakers", speakersRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

app.use(errorHandler);


export default app;