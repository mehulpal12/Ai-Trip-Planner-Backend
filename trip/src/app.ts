import express from "express";
import prisma from "./config/db.js";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import tripRoutes from "./routes/trip.routes.js";

const app = express();

app.use(helmet());

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/trips", tripRoutes);




app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Trip Service Running",
  });
});

export default app;