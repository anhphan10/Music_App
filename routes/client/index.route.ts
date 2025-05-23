import { Express } from "express";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { favoriteSongRoutes } from "./favorite-song.route";
import { searchRoutes } from "./search.route";
import { homeRoutes } from "./home.route";

const clientRouter = (app: Express) => {
    app.use("/topics", topicRoutes);
    app.use("/songs", songRoutes);
    app.use("/favorite-songs", favoriteSongRoutes);
    app.use("/search", searchRoutes);
    app.use("/", homeRoutes);
}

export default clientRouter;