import { Router } from "express";
import signUp from "../controllers/auth/sign-up";
import signIn from "../controllers/auth/sign-in";

export const routes = Router();

// Auth routes
routes.post("sign-in", signIn);
routes.post("sign-up", signUp);