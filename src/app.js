import express from "express";

import cors from "cors";
import categorieRouter from "./router/categorieRouter.js";
import topicRouter from "./router/topicRouter.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(categorieRouter);
app.use(topicRouter);

export default app;
