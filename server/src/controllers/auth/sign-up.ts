import {NextFunction, Request, Response} from "express";
import expressAsyncHandler from "express-async-handler";
import {prisma} from "../../helpers/prisma";
import bcrypt from "bcrypt";

const signUp = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({message: "Email and password are required."});
      return;
    }

    // check if the user already exists
    const userExists = await prisma.user.findUnique({
      where: {email},
    });

    if (userExists) {
      res.status(400).json({message: "User already exists."});
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({message: "User signed up successfully."});
  }
);

export default signUp;
