import jwt from "jsonwebtoken";
import {User} from "../model/user.model"

const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateToken = (user: User) => {
  return jwt.sign(
    {
      sub: user._id,
      email: user.email,
    }, 
    JWT_SECRET, 
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN}
  )
}
