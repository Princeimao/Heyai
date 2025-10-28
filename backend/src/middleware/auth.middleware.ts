import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface JwtPayload {
  name: string;
  id: string;
  email: string;
  jti: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["accessToken"];

    if (!token) {
      res.status(400).json({
        success: false,
        message: "Unauthorized Request",
      });
      return;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT Secret is not defined");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    req.user = decoded;

    next();
  } catch (error) {
    console.log("something went wrong - Auth Middleware", error);
    res.status(500).json({
      success: false,
      message: "something went wrong - Auth Middleware",
    });
  }
};
