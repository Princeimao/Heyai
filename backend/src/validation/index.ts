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
