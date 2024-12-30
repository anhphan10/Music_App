import { Request, Response } from "express";
import FavoriteSong from "../../model/favorite-song.model";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";
//[Get]/favorite-songs
export const index = async (req: Request, res: Response) => {
    const favoriteSongs = await FavoriteSong.find({
        // userId = ""
        deleted: false
    });

    for (var item of favoriteSongs) {
        const infoSong = await Song.findOne({
            _id : item.songId
        });

        const infoSinger = await Singer.findOne({
            _id: infoSong.singerId 
        });

        item["infoSong"] = infoSong;
        item["infoSinger"] = infoSinger;
    };

    res.render("client/pages/favorite-songs/index", {
        pageTitle: "Bài Hát Yêu Thích",
        favoriteSongs: favoriteSongs
    });
};