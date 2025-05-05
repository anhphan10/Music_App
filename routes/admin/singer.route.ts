import { Router } from "express";
import multer from "multer"
const router: Router = Router();
import * as controller from "../../controller/admin/singer.controller";
const upload = multer();
router.get("/", controller.singer);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.get("/detail/:id" , controller.detail);


export const singerRoutes: Router = router;