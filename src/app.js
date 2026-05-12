import express from "express";
import helloRoutes from "./routes/hello.routes.js";

const app = express();

app.use(express.json());

app.use("/api", helloRoutes);

export default app;