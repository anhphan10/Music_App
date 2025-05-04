import { Request, Response } from "express";
import Topic from "../../model/topic.model";
import { systemConfig } from "../../config/config";
import { title } from "process";
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
//[GET]/admin/topics/detail/:id
export const detailTopic = async (req: Request, res: Response) => {
    const topic = await Topic.findOne({ _id: req.params.id }, { deleted: false });
    res.render("admin/pages/topics/detail", {
        pageTitle: "Trang Chi Tiết Chủ Đề",
        topic: topic
    });
}
//[Get]/admin/topics/edit/:id
export const editTopic = async (req: Request, res: Response) => {
    const topic = await Topic.findOne({ _id: req.params.id }, { deleted: false });
    res.render("admin/pages/topics/edit", {
        pageTitle: "Trang Chỉnh Sửa Chủ Đề",
        topic: topic
    });
}
//[PATCH]/admin/topics/edit/:id
export const editPatchTP = async (req: Request, res: Response) => {
    const id = req.params.id;
    const dataTopic = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    }
    if (req.body.avatar) {
        dataTopic["avatar"] = req.body.avatar[0]
    };
    try {
        await Topic.updateOne({ _id: id }, dataTopic);
        res.redirect(`/${systemConfig.prefixAdmin}/topics`);
    } catch (error) {
        console.log(error)
    }
}
export const changeStatus = async (req: Request, res: Response) => {
    const id = req.params.id;
    const status = req.params.status;
    try {
        await Topic.updateOne({ _id: id }, { status: status });
        res.redirect(`/${systemConfig.prefixAdmin}/topics`);
    } catch (error) {
        console.log(error);
    }
}