import { Express } from "express";
import { dashboardRoutes } from "./dashboard.route";
import { systemConfig } from "../../config/config";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { uploadRoutes } from "./upload.route";
import { singerRoutes } from "./singer.route";
import { authRoutes } from "./auth.route";
import { accountRoutes } from "./account.route";
import * as authMW from "../../middlewares/admin/auth.middlewares"

const adminRoutes = (app: Express): void => {
    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`

    app.use(`${PATH_ADMIN}/dashboard`, authMW.requireAuth, dashboardRoutes);
    app.use(`${PATH_ADMIN}/topics`, authMW.requireAuth, topicRoutes);
    app.use(`${PATH_ADMIN}/songs`, authMW.requireAuth, songRoutes);
    app.use(`${PATH_ADMIN}/upload`, authMW.requireAuth, uploadRoutes);
    app.use(`${PATH_ADMIN}/singers`, authMW.requireAuth, singerRoutes);
    app.use(`${PATH_ADMIN}/auth`, authRoutes);
    app.use(`${PATH_ADMIN}/accounts`, authMW.requireAuth, accountRoutes);

};

export default adminRoutes;