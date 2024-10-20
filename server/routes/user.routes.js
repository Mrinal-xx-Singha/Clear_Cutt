import express from "express";
import { clerkWebHooks } from "../controllers/User.controller.js";

const userRouter = express.Router();

userRouter.post("/webhooks", clerkWebHooks);

export default userRouter;
