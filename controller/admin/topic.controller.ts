import { Request, Response } from "express";
import Topic from "../../model/topic.model";
import { systemConfig } from "../../config/config";
//[get]/admin/topics
export const topic = async (req: Request, res: Response) => {
    const topics = await Topic.find({
        deleted: false
    });
    res.render("admin/pages/topics/index", {
        pageTitle: "Quản Lí Chủ Đề",
        topics: topics
    })
}

//[Get]/admin/topics/create
export const create = async (req: Request, res: Response) => {
    const topics = await Topic.find({ deleted: false });
    res.render("admin/pages/topics/create", {
        pageTitle: "Trang Thêm Mới Chủ Đề",
        topics: topics
    })
}
//[POST]/admin/topics/createPost
export const createPost = async (req: Request, res: Response) => {
    let avatar = "";
    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    }
    interface topic {
        title: string,
        avatar: string,
        description: string,
        status: string
    };
    const dataTopic: topic = {
        title: req.body.title,
        avatar: avatar,
        description: req.body.description,
        status: req.body.status
    }
    try {
        const topic = new Topic(dataTopic);
        await topic.save();
        res.redirect(`/${systemConfig.prefixAdmin}/topics`);
    } catch (error) {
        console.log(error);
    }
}

export const deleteTopic = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        await Topic.updateOne({ _id: id }, { deleted: true });
        res.redirect(`/${systemConfig.prefixAdmin}/topics`);
    } catch (error) {
        console.log(error);
    }
}
