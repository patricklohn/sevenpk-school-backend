import { Router } from "express";

import categorieController from "../controllers/categorieController.js";

const categorieRouter = Router();

categorieRouter.post("/categorie", categorieController.createCategorie);

export default categorieRouter;
