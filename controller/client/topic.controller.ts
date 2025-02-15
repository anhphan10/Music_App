import Topic from "../../model/topic.model";
import { Request, Response } from "express";
//[Get]/topics
export const topics = async (req: Request, res: Response) => {
    const toipcs = await Topic.find({
        deleted: false
    })
    res.render("client/pages/topics/index", {
        pageTitle: "Chủ Đề Bài Hát",
        topics: toipcs
    });
}
