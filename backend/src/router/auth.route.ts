import express from "express";
import { login } from "../controller/auth.controller";

const router = express.Router();

router.route("/login").post(login);
router.route("/callback");

export default router;
