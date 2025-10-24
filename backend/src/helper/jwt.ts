import jwt from "jsonwebtoken";

export const generateAccessToken = (
  name: string,
  id: string,
  email: string
) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret is not define");
  }
  return jwt.sign(
    {
      name,
      id,
      email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export const generateRefreshToken = (id: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret is not define");
  }
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "10d" }
  );
};
