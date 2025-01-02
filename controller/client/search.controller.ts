import { Request, Response } from "express";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";
import { convertToSlug } from "../../helper/converttoslug";

export const result = async (req: Request, res: Response) => {
    const keyword: string = `${req.query.keyword}`;
    let newSongs = [];
    if (keyword) {
        const keywordRegex = new RegExp(keyword, "i");
        //Tạo ra slug không dấu có dấu trừ ngăn cách
        const stringSlug = convertToSlug(keyword);
        const stringSlugRegex = new RegExp(stringSlug, "i");
        const songs = await Song.find({
            $or: [
                { title: keywordRegex },
                { slug: stringSlugRegex }
            ]
        });
        for (var item of songs) {
            const infoSinger = await Singer.findOne({ _id: item.singerId }, { deleted: false });
            item["infoSinger"] = infoSinger;
        }
        newSongs = songs
    }

    res.render("client/pages/search/result", {
        pageTitle: `Kết Quả: ${keyword}`,
        keyword: keyword,
        songs: newSongs
    })
}