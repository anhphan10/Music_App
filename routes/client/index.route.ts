import { Express } from "express";
import { topicRoutes } from "./topic.route";

const clientRouter = (app: Express) => {
    app.use("/topics", topicRoutes);
}

export default clientRouter;