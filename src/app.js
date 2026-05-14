import express from "express";
import helloRoutes from "./routes/hello.routes.js";
import eventsRoutes from "./routes/events.routes.js";

const app = express();

app.use(express.json());

app.use("/api", helloRoutes);
app.use("/api", eventsRoutes);

export default app;