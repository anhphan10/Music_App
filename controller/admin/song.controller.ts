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
    let avatar = "";
    let audio = "";
    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    }
    if (req.body.audio) {
        audio = req.body.audio[0];
    }
    interface Song {
        title: String,
        topicId: String,
        singerId: String,
        description: String,
        status: String,
        avatar: String,
        audio: String,
        lyrics: String
    }
    const dataSong: Song = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        avatar: avatar,
        audio: audio,
        lyrics: req.body.lyrics
    }
    try {
        const song = new Song(dataSong);
        await song.save();
        (req as any).flash('success', "Thêm Thành Công Bài Hát")
    } catch (error) {

    }
    res.redirect(`/${systemConfig.prefixAdmin}/songs`);
}
//[Get]/admin/songs/edit/id
export const edit = async (req: Request, res: Response) => {
    const song = await Song.findOne({ _id: req.params.id }, { deleted: false });
    const topics = await Topic.find({
        deleted: false
    }).select("title");
    const singers = await Singer.find({
        deleted: false
    }).select("fullName");
    res.render("admin/pages/songs/edit", {
        pageTitle: "Trang Chỉnh Sửa Bài Hát",
        song: song,
        topics: topics,
        singers: singers
    })
}
//[Patch]/admin/songs/edit/id
export const editPatch = async (req: Request, res: Response) => {
    const id = req.params.id;
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        lyrics: req.body.lyrics
    };
    if (req.body.avatar) {
        dataSong["avatar"] = req.body.avatar[0]
    };
    if (req.body.audio) {
        dataSong["audio"] = req.body.audio[0]
    }
    await Song.updateOne({
        _id: id,
    }, dataSong);
    res.redirect("back");
}
//[Delete]/admin/songs/delete/:id
export const deletePost = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        await Song.updateOne(
            { _id: id },
            { deleted: true }
        );
        res.redirect("back");
    } catch (error) {
        console.log(error);
    }
}
//[Get]/admin/song/detail/:id
export const detail = async (req: Request, res: Response) => {
    const song = await Song.findOne({ _id: req.params.id }, { deleted: false });
    const singer = await Singer.findOne({ _id: song.singerId }).select("fullName");
    const topic = (await Topic.findOne({ _id: song.topicId }).select("title"));
    res.render("admin/pages/songs/detail", {
        pageTitle: "Trang Chi Tiết Bài Hát",
        song: song,
        singer: singer,
        topic: topic
    });
}
//[PATCH]/admin/songs/change-status/:status/:id
export const changeStatus = async (req: Request, res: Response) => {
    const status: string = req.params.status;
    const id: string = req.params.id;
    try {
        await Song.updateOne({ _id: id }, { status: status });
    } catch (error) {
        console.log(error)
    }

    res.redirect("back");

}