import express from "express";
import { registerUser } from "../controller/clerk.controller";

const router = express.Router();

router.route("/webhook").post(registerUser);

export default router;
