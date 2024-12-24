import { Request , Response , Router } from "express";
const router: Router = Router();

import Topic from "../../model/topic.model";
router.get("/");


export const topicRoutes: Router = router;
