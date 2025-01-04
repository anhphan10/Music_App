import { Request, Response } from "express";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";
import { convertToSlug } from "../../helper/converttoslug";

//[Get]/search/:type
export const result = async (req: Request, res: Response) => {
    const keyword: string = `${req.query.keyword}`;
    const type = req.params.type;
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

            newSongs.push({
                id: item.id,
                title: item.title,
                avatar: item.avatar,
                like: item.like,
                slug: item.slug,
                infoSinger: {
                    fullName: infoSinger.fullName
                }
            })
        }
    }

    switch (type) {
        case "result":
            res.render("client/pages/search/result", {
                pageTitle: `Kết Quả: ${keyword}`,
                keyword: keyword,
                songs: newSongs
            });
            break;
        case "suggest":
            res.json({
                code: 200,
                message: "Thành Công!",
                songs: newSongs
            })
            break;
        default:
            break;
    }
}
