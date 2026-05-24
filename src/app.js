import express from "express";
import helloRoutes from "./routes/hello.routes.js";
import eventsRoutes from "./routes/events.routes.js";
import speakersRoutes from "./routes/speaker.routes.js"
import authRoute from "./routes/auth.routes.js";
import roomRoutes from "./routes/room.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import questionRoutes from "./routes/question.routes.js";

import { errorHandler } from "./middlewares/error.middlewares.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser()); 
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api", helloRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/speakers", speakersRoutes);
app.use("/api/rooms", roomRoutes);

app.use("/api/sessions", sessionRoutes);

app.use("/api/questions", questionRoutes);

app.use(errorHandler);

app.use("/api/auth", authRoute);

export default app;