import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controller/admin/account.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middlewares";
import multer from "multer";
const upload = multer();
router.get("/", controller.index)
router.get("/create", controller.create);
router.post(
    "/create",
    upload.fields([
        { name: "avatar", maxCount: 1 }
    ]),
    uploadCloud.uploadFields,
    controller.createAcc
);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.get("/delete/:id", controller.deleteAcc);
router.get("/edit/:id", controller.edit);
router.patch(
    "/edit/:id",
    upload.fields([
        { name: "avatar", maxCount: 1 }
    ]),
    uploadCloud.uploadFields,
    controller.editAcc
);
router.get("/detail/:id", controller.detail);

export const accountRoutes: Router = router;