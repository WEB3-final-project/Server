import express from "express";
import helloRoutes from "./routes/hello.routes.js";
import eventsRoutes from "./routes/events.routes.js";
import speakersRoutes from "./routes/speaker.routes.js"
import authRoute from "./routes/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser()); 
app.use(express.json());

app.use("/api", helloRoutes);
app.use("/api", eventsRoutes);
app.use("/api", speakersRoutes);

app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoute);

export default app;