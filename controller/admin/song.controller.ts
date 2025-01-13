import { Request, Response } from "express";
import Song from "../../model/song.model";
import Topic from "../../model/topic.model";
import Singer from "../../model/singer.model";
import { systemConfig } from "../../config/config";
//[Get]/admin/songs
export const song = async (req: Request, res: Response) => {
    const songs = await Song.find({ deleted: false });

    res.render("admin/pages/songs/index", {
        pageTitle: "Quản Lí Bài Hát",
        songs: songs
    });
}

//[Get]/admin/songs/create
export const create = async (req: Request, res: Response) => {
    const topics = await Topic.find({ deleted: false }, { status: "active" }).select("title");
    const singer = await Singer.find({ deleted: false }, { status: "active" }).select("fullName")
    res.render("admin/pages/songs/create", {
        pageTitle: "Trang Thêm Mới Bài Hát",
        topics: topics,
        singer: singer
    });
}
//[Post]/admin/songs/create
export const createPost = async (req: Request, res: Response) => {
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        avatar: req.body.avatar
    }
    const song = new Song(dataSong);
    await song.save();
    res.redirect(`/${systemConfig.prefixAdmin}/songs`);
}