import { Router } from "express";

import userController from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/get-all-user", userController.getAllUser);

export default userRouter;
