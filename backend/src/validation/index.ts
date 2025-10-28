import { string, z } from "zod";

export const emailValidation = z.object({
  email: z.email(),
});

export const passwordValidation = z.object({
  password: string().min(8, { message: "Password atleat 8 character long" }),
});

export const paramsValidation = z.object({
  code: z.string(),
  state: z.string(),
});

export const loginPasswordValidation = z.object({
  email: z.email(),
  password: string().min(8, { message: "Password atleat 8 character long" }),
});

export const otpValidation = z.object({
  email: z.email(),
  userOtp: z.string().min(6).max(6),
});

export const userDetailValidation = z.object({
  email: z.email(),
  name: z.string().min(2, { message: "Name atleast 2 character long" }).max(50),
  birthdate: z.date().optional(),
});
