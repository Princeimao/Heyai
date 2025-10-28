import express from "express";
import {
  googleLogin,
  login,
  loginCreatePass,
  otpVerify,
  refreshAccessToken,
  user,
  userDetails,
} from "../controller/auth.controller";

const router = express.Router();

router.route("/login").post(login);
router.route("/callback").post(googleLogin);
router.route("/login/create-password").post(loginCreatePass);
router.route("/login/verify-otp").post(otpVerify);
router.route("/login/user-details").post(userDetails);
router.route("/refresh").post(refreshAccessToken);

router.route("/me").get(user);

export default router;
