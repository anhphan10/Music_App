import { Router } from "express";
import multer from "multer"
const router: Router = Router();
import * as controller from "../../controller/admin/song.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middlewares";
import * as validate from "../../validates/admin/song.validate";
const upload = multer();
router.get("/", controller.song);
router.get("/create", controller.create);
router.post(
    "/create",
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "audio", maxCount: 1 }
    ]),
    uploadCloud.uploadFields,
    validate.createPost,
    controller.createPost
);
router.get("/edit/:id", controller.edit);

router.patch(
    "/edit/:id",
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "audio", maxCount: 1 }
    ]),
    uploadCloud.uploadFields,
    controller.editPatch
);
router.get("/delete/:id" , controller.deletePost);

export const songRoutes: Router = router;