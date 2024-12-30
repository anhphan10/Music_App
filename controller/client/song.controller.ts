import { Request, Response } from "express";
import Topic from "../../model/topic.model";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";
import FavoriteSong from "../../model/favorite-song.model";


//[get]/songs/slugTopic
export const list = async (req: Request, res: Response) => {
    try {
        const topic = await Topic.findOne({
            slug: req.params.slugTopic,
            status: "active",
            deleted: false
        });
        const songs = await Song.find({
            topicId: topic.id,
            status: "active",
            deleted: false
        }).select("avatar title slug singerId like");
        for (const song of songs) {
            const infoSinger = await Singer.findOne({
                _id: song.singerId,
                status: "active",
                deleted: false
            })
            song["infoSinger"] = infoSinger;
        }
        res.render("client/pages/songs/list", {
            pageTitle: topic.title,
            songs: songs
        });
    } catch (error) {
        console.log(error);
    }
};

//[get]/songs/detail/slugSong
export const detail = async (req: Request, res: Response) => {
    const slugSong: string = req.params.slugSong;
    const song = await Song.findOne({
        slug: slugSong,
        status: "active",
        deleted: false
    })
    const singer = await Singer.findOne({
        _id: song.singerId,
        deleted: false
    }).select("fullName");
    const topic = await Topic.findOne({
        _id: song.topicId,
        deleted: false
    }).select("title");
    const favoriteSong = await FavoriteSong.findOne({
        songId: song.id
    });
    song["isFavoriteSong"] = favoriteSong ? "true" : "false";

    res.render("client/pages/songs/detail", {
        pageTitle: "Chi Tiết Bài Hát",
        song: song,
        singer: singer,
        topic: topic
    })
}

//[patch]songs/like/typeLike/:idSong
export const like = async (req: Request, res: Response) => {
    const idSong: String = req.params.idSong;
    const typeLike = req.params.typeLike;
    const song = await Song.findOne({
        _id: idSong,
        status: "active",
        deleted: false
    });

    const newLike: number = typeLike == "like" ? song.like + 1 : song.like - 1

    await Song.updateOne({ _id: idSong }, {
        like: newLike
    });

    res.json({
        code: 200,
        message: "Thành Công",
        like: newLike
    })
}

//[patch]songs/favorite/typeFavorite/:idSong
export const favorite = async (req: Request, res: Response) => {
    const idSong: String = req.params.idSong;
    const typeFavorite: String = req.params.typeFavorite;

    switch (typeFavorite) {
        case "favorite":
            const existFavoriteSong = await FavoriteSong.findOne({
                _id: idSong
            });
            if (!existFavoriteSong) {
                const record = new FavoriteSong({
                    // userId
                    songId: idSong
                });
                await record.save();
            };
            break;
        case "unfavorite":
            await FavoriteSong.deleteOne({
                songId: idSong
            });
            break;
        default:
            break;
    };


    res.json({
        code: 200,
        message: "Thành Công"
    })
}
