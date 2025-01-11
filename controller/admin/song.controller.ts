import { Request, Response } from "express";
import Song from "../../model/song.model";
export const song = async (req: Request, res: Response) => {
    const songs = await Song.find({ deleted: false });

    res.render("admin/pages/songs/index", {
        pageTitle: "Quản Lí Bài Hát",
        songs: songs
    })
}