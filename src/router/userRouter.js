import { Router } from "express";

import userController from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/create-user", userController.createUser);

export default userRouter;
