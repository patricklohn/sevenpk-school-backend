import { Router } from "express";

import topicController from "../controllers/topicController.js";
import authenticateToken from "../middleware/authenticate.js";

const topicRouter = Router();

topicRouter.post("/topic", authenticateToken, topicController.createTopic);
topicRouter.get("/topic", topicController.getTopics);
topicRouter.get("/topic/:id", topicController.getTopic);
topicRouter.delete("/topic/:id", topicController.deleteTopic);
topicRouter.put("/topic/:id", topicController.updateTopic);

export default topicRouter;
