import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controller/admin/song.controller";
router.get("/" ,controller.song);
export const songRoutes: Router = router;