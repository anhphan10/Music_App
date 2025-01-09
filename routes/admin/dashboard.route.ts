import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controller/admin/dashboard.controller";

router.get("/dashboard", controller.dashboard);
export const dashboardRoutes: Router = router;