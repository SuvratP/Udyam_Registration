import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import registrationRoutes from "./routes/registrationRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", registrationRoutes);

export default app;
