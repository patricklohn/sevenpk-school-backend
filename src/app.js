import express from "express";

import cors from "cors";
import categorieRouter from "./router/categorieRouter.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(categorieRouter);

export default app;
