import { Router } from "express";
import multer from "multer"
const router: Router = Router();
import * as controller from "../../controller/admin/singer.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middlewares";
const upload = multer();
router.get("/", controller.singer);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.get("/detail/:id" , controller.detail);
router.get("/create" , controller.create);
router.post(
    "/create",
    upload.fields([
        { name: "avatar", maxCount: 1 }
    ]),
    uploadCloud.uploadFields,
    controller.createPostSG
);
router.get("/edit/:id", controller.edit);
router.patch(
    "/edit/:id",
    upload.fields([
        { name: "avatar", maxCount: 1 }
    ]),
    uploadCloud.uploadFields,
    controller.editPatch
);

export const singerRoutes: Router = router;