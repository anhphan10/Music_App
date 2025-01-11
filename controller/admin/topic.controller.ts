import { Request , Response } from "express";
import Topic from "../../model/topic.model";
//[get]/admin/topics
export const topic = async (req:Request , res:Response) =>{
    const topics = await Topic.find({
        deleted : false
    });
    res.render("admin/pages/topics/index",{
        pageTitle: "Quản Lí Chủ Đề",
        topics: topics
    })
}