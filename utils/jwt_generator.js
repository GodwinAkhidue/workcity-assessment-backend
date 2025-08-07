import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function generateJWT(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
}
