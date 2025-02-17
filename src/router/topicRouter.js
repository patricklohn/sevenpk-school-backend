import { Router } from "express";

import topicController from "../controllers/topicController.js";

const topicRouter = Router();

topicRouter.post("/topic", topicController.createTopic);

export default topicRouter;
