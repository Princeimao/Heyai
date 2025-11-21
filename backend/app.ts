import { clerkMiddleware } from "@clerk/express";
import cookerParser from "cookie-parser";
import cors from "cors";
import express from "express";

export const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookerParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

// API ROUTES
// import authRoute from "./src/router/auth.router";
import aiRoute from "./src/router/chat.router";
import clerkRoute from "./src/router/clerk.router";

// app.use("/v1/auth", authRoute);
app.use("/v1/ai", aiRoute);
app.use("/api", clerkRoute);
