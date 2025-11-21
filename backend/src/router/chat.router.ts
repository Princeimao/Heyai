import { requireAuth } from "@clerk/express";
import express from "express";
import {
  continueConversation,
  createConversation,
  deleteConversation,
  getConversation,
} from "../controller/chat.controller";

const router = express.Router();

router.route("/create/conversation").post(requireAuth, createConversation);
router
  .route("/conversation/:executionId")
  .post(requireAuth, continueConversation);
router
  .route("/get/conversation/:executionId")
  .get(requireAuth, getConversation);
router
  .route("/delete/conversation/:executionId")
  .delete(requireAuth, deleteConversation);

export default router;
