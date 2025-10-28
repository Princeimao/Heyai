import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export const generateAccessToken = (
  name: string,
  id: string,
  email: string
) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret is not define");
  }
  const jti = uuidv4();

  return jwt.sign(
    {
      name,
      id,
      email,
      jti,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export const generateRefreshToken = (id: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret is not define");
  }
  const jti = uuidv4();
  return jwt.sign(
    {
      id,
      jti,
    },
    process.env.JWT_SECRET,
    { expiresIn: "10d" }
  );
};
