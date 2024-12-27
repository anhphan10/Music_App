import { Express } from "express";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";

const clientRouter = (app: Express) => {
    app.use("/topics", topicRoutes);
    app.use("/songs", songRoutes);
}

export default clientRouter;