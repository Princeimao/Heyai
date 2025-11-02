import express from "express";
import {
  continueConversation,
  createConversation,
  deleteConversation,
  getConversation,
} from "../controller/chat.controller";

const router = express.Router();

router.route("/create/conversation").post(createConversation);
router.route("/conversation/:executionId").post(continueConversation);
router.route("/get/conversation/:executionId").get(getConversation);
router.route("/delete/conversation/:executionId").delete(deleteConversation);

export default router;
