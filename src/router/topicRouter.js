import { Router } from "express";

import topicController from "../controllers/topicController.js";

const topicRouter = Router();

topicRouter.post("/topic", topicController.createTopic);
topicRouter.get("/topic", topicController.getTopics);
topicRouter.get("/topic/:id", topicController.getTopic);
topicRouter.delete("/topic/:id", topicController.deleteTopic);
topicRouter.put("/topic/:id", topicController.updateTopic);

export default topicRouter;
