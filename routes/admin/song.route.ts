import { Router } from "express";
import multer from "multer"
const router: Router = Router();
import * as controller from "../../controller/admin/song.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middlewares";
const upload = multer();
router.get("/" ,controller.song);
router.get("/create", controller.create);
router.post(
    "/create",
     upload.single("avatar"),
     uploadCloud.uploadSingle,
     controller.createPost
);
export const songRoutes: Router = router;