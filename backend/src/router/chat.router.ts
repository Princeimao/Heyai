import express from "express";
import {
  continueConversation,
  createConversation,
  deleteConversation,
  getConversation,
} from "../controller/chat.controller";
import { authMiddleware } from "./../middleware/auth.middleware";

const router = express.Router();

router.route("/create/conversation").post(authMiddleware, createConversation);
router
  .route("/conversation/:executionId")
  .post(authMiddleware, continueConversation);
router
  .route("/get/conversation/:executionId")
  .get(authMiddleware, getConversation);
router
  .route("/delete/conversation/:executionId")
  .delete(authMiddleware, deleteConversation);

export default router;
