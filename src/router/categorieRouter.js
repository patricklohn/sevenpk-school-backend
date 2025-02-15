import { Router } from "express";

import categorieController from "../controllers/categorieController.js";

const categorieRouter = Router();

categorieRouter.post("/categorie", categorieController.createCategorie);
categorieRouter.get("/categorie", categorieController.getAll);
categorieRouter.put("/categorie/:id", categorieController.updateCategory);
categorieRouter.delete("/categorie/:id", categorieController.deleteCategory);

export default categorieRouter;
