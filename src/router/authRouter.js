// rotas de LOGIN, REGISTRO e ROTA AUTENTICADA (ME)

import { Router } from "express";
import authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/create-user", authController.createUser);
authRouter.post("/login", authController.login);

export default authRouter;
