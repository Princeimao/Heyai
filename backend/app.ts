import cookerParser from "cookie-parser";
import cors from "cors";
import express from "express";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookerParser());

// API ROUTES
import authRoutes from "./src/router/auth.route";
app.use("/v1/auth", authRoutes);
