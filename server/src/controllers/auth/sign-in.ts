import {NextFunction, Request, Response} from "express";
import expressAsyncHandler from "express-async-handler";
import {prisma} from "../../helpers/prisma";
import bcrypt from "bcrypt";

const signIn = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({message: "Email and password are required."});
      return;
    }

    // Check if the user exists and the password is correct
    const userExists = await prisma.user.findUnique({
      where: {email},
    });

    if (!userExists) {
      res.status(401).json({message: "Invalid email or password."});
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, userExists.password);

    if (!isPasswordValid) {
      res.status(401).json({message: "Invalid email or password."});
      return;
    }

    // Create a new session
    const newSession: any = await prisma.session.create({
      data: {
        userId: userExists.id,
        expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
      },
    });

    // Add the user's data (minus the password) to the session
    newSession.user = {
      id: userExists.id,
      email: userExists.email,
      name: userExists.name,
      createdAt: userExists.createdAt,
      updatedAt: userExists.updatedAt,
    };

    res
      .status(200)
      .json({message: "User signed in successfully.", session: newSession});
  }
);

export default signIn;
