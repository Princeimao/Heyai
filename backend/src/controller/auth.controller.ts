import * as arctic from "arctic";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { google } from "../config/google.client";
import { prisma } from "../config/prisma.client";
import { generateOtp } from "../helper/generateOtp";
import { generateAccessToken, generateRefreshToken } from "../helper/jwt";
import {
  loginPasswordValidation,
  paramsValidation,
  userDetailValidation,
} from "../validation";
import { hashPassword } from "./../helper/bcrypt";
import { emailValidation, otpValidation } from "./../validation/index";

// Change the otpMap from in memory to redis
const optMap = new Map<string, number>();

export const login = async (req: Request, res: Response) => {
  try {
    const { email } = emailValidation.parse(req.body);

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
      include: {
        providers: true,
      },
    });

    const googleProvider = user?.providers.find(
      (prov) => prov.providerName === "google"
    );

    if (!user) {
      res.redirect(`${process.env.FRONTEND_URL}/auth/password`);
    } else {
      if (googleProvider) {
        const state = arctic.generateState();
        const codeVerifier = arctic.generateCodeVerifier();
        const scopes = ["user:email", "repo"];
        const url = google.createAuthorizationURL(state, codeVerifier, scopes);

        res.cookie("state", state, {
          secure: true,
          path: "/",
          httpOnly: true,
          maxAge: 60 * 10,
        });

        res.cookie("code_verifier", codeVerifier, {
          secure: true,
          path: "/",
          httpOnly: true,
          maxAge: 60 * 10,
        });

        return res.redirect(url.toString());
      } else {
        res.redirect(`${process.env.FRONTEND_URL}/auth/create-password`);
      }
    }
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Invalid Credientials",
      });
    }

    res.status(500).json({
      success: false,
      message: "something went wrong while login user",
    });
  }
};

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { code, state } = paramsValidation.parse(req.params);

    const storedState = req.cookies.state;
    const storedCodeVerifier = req.cookies.code_verifier;

    if (
      code === null ||
      storedState === null ||
      state !== storedState ||
      storedCodeVerifier === null
    ) {
      throw new Error("Invalid request");
    }

    const tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier
    );
    const accessToken = tokens.accessToken();
    const idToken = tokens.idToken();

    const userPayload = arctic.decodeIdToken(idToken);

    console.log(userPayload);
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("zod Error");
      res.status(400).json({
        success: false,
        message: "zod Error",
        error: error,
      });
    }
    console.log("something went wrong", error);
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error,
    });
  }
};

export const login_createPass = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginPasswordValidation.parse(req.body);

    const hashPass = await hashPassword(password);

    await prisma.user.create({
      data: {
        email: email,
        status: "draft",
        providers: {
          create: {
            providerName: "email",
            passwordHash: hashPass,
          },
        },
      },
      include: { providers: true },
    });

    const otp = generateOtp();
    optMap.set(email, otp);
    if (process.env.NODE_ENV === "DEVELOPMENT") {
      console.log(otp);
    }
    // send otp in email

    res.status(200).json({
      success: true,
      message: "otp send successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("zod Error");
      res.status(400).json({
        success: false,
        message: "zod Error",
        error: error,
      });
    }

    console.log("something went wrong while creating login password", error);
    res.status(500).json({
      success: false,
      message: "somethign went wrong while creating login password",
    });
  }
};

export const otp_verify = async (req: Request, res: Response) => {
  try {
    const { email, userOtp } = otpValidation.parse(req.body);

    const otp = optMap.get(email);

    if (otp !== userOtp) {
      res.status(400).json({
        success: false,
        message: "Invalid otp",
      });
      return;
    }

    optMap.delete(email);

    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        isEmailVerified: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Otp verified successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("zod Error");
      res.status(400).json({
        success: false,
        message: "zod Error",
        error: error,
      });
    }
    console.log("something went wrong while verifying otp");
    res.status(500).json({
      success: false,
      message: "something went wrong while verifying otp",
    });
  }
};

export const userDetails = async (req: Request, res: Response) => {
  try {
    const { email, name, birthdate } = userDetailValidation.parse(req.body);

    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        name: name,
        birthdate: birthdate,
        status: "active",
      },
    });

    if (!user || !user.name) {
      res.status(500).json({
        success: false,
        message: "something went wrong while creating user",
      });
      return;
    }

    const accessToken = generateAccessToken(user.name, user.id, user.email);
    const refreshToken = generateRefreshToken(user.id);
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("zod Error");
      res.status(400).json({
        success: false,
        message: "zod Error",
        error: error,
      });
    }
    console.log("something went wrong while updating user");
    res.status(500).json({
      success: false,
      message: "something went wrong while while updating user",
    });
  }
};
