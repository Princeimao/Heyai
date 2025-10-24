import crypto from "crypto";

export const generateOtp = (): number => {
  return crypto.randomInt(100000, 999999);
};
