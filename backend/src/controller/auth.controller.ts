import * as arctic from "arctic";
import { Request, Response } from "express";
import { ZodError } from "zod";
import { google } from "../config/google.client";
import { prisma } from "../config/prisma.client";
import { emailValidation, paramsValidation } from "../validation";

// Change the otpMap from in memory to redis
const optMap = new Map<string, string>();

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
    console.log("something went wrong", error);
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error: error,
    });
  }
};
