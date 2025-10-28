import * as arctic from "arctic";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
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
      res.status(200).json({
        redirect_url: `/auth/create-password`,
      });
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
        res.redirect(`/auth/password`);
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

export const loginCreatePass = async (req: Request, res: Response) => {
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
    if (process.env.NODE_ENV === "PRODUCTION") {
      // send otp in email
    }
    console.log(otp);

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

export const otpVerify = async (req: Request, res: Response) => {
  try {
    const { email, userOtp } = otpValidation.parse(req.body);

    const otp = optMap.get(email);

    if (otp !== Number(userOtp)) {
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
        birthdate: birthdate === undefined ? null : birthdate,
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

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "user logged in successfully",
      user: {
        name: user.name,
        profilePicture: user.profileImage,
        email: user.email,
        id: user.id,
      },
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
    console.log("something went wrong while updating user", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while while updating user",
    });
  }
};

export const user = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("something weng wrong while: User route");
    }

    const existedUser = await prisma.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (!existedUser) {
      res.status(500).json({
        success: false,
        message: "Internal server error - user not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User get successfully",
      user: {
        name: existedUser.name,
        profilePicture: existedUser.profileImage,
        email: existedUser.email,
        id: existedUser.id,
      },
    });
  } catch (error) {
    console.log("something went wrong while getting user", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while getting user",
    });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies["refreshToken"];

    if (!refreshToken) {
      res.status(400).json({
        success: false,
        message: "Unauthorized request: Refresh Token is not defined",
      });
      return;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT Secret is not defined");
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET) as {
      id: string;
      jti: string;
    };

    if (!decoded) {
      throw new Error("Something went wrong");
    }

    const verifyToken = await prisma.user.findFirst({
      where: {
        id: decoded.id,
      },
    });

    if (refreshToken !== verifyToken?.refreshToken) {
      res.status(400).json({
        success: false,
        message: "Invalid Token: Token not matched",
      });
      return;
    }

    if (!verifyToken?.name) {
      throw new Error("Internal server Error");
    }

    const accessToken = generateAccessToken(
      verifyToken?.name,
      verifyToken?.id,
      verifyToken?.email
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
    });
  } catch (error) {
    console.log("something went wrong while refreshing access token", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while refreshing access token",
    });
  }
};
