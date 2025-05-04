import { Router } from "express";
import multer from "multer";
const upload = multer();
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middlewares";
import * as controller from "../../controller/admin/topic.controller"
import * as validate from "../../validates/admin/topic.validate";
const router: Router = Router();
router.get("/", controller.topic);
router.get("/create", controller.create);
router.post(
    "/create",
    upload.fields([
        { name: "avatar", maxCount: 1 }
    ]),
    uploadCloud.uploadFields,
    validate.createTopic,
    controller.createPost
);
router.get("/delete/:id", controller.deleteTopic);
router.get("/detail/:id", controller.detailTopic);
router.get("/edit/:id", controller.editTopic);
router.patch(
    "/edit/:id",
    upload.fields([
        { name: "avatar", maxCount: 1 }
    ]),
    uploadCloud.uploadFields,
    controller.editPatchTP
);
router.patch("/change-status/:status/:id" , controller.changeStatus);

export const topicRoutes: Router = router;