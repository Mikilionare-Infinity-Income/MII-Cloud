import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

const signIn = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required." });
      return;
    }

    // Here you would typically check the credentials against a database
    // For demonstration, we'll assume the credentials are valid
    res.status(200).json({ message: "User signed in successfully." });
  },
);

export default signIn;
