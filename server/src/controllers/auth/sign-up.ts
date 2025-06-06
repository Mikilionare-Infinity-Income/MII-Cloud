import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

const signUp = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required." });
      return;
    }

    res.status(201).json({ message: "User signed up successfully." });
  },
);

export default signUp;
