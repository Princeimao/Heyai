import express from "express";
import { createConversation } from "../controller/chat.controller";

const router = express.Router();

router.route("/chat").post(createConversation);

export default router;
