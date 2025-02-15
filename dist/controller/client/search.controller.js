"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.result = void 0;
const song_model_1 = __importDefault(require("../../model/song.model"));
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const converttoslug_1 = require("../../helper/converttoslug");
const result = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = `${req.query.keyword}`;
    const type = req.params.type;
    let newSongs = [];
    if (keyword) {
        const keywordRegex = new RegExp(keyword, "i");
        const stringSlug = (0, converttoslug_1.convertToSlug)(keyword);
        const stringSlugRegex = new RegExp(stringSlug, "i");
        const songs = yield song_model_1.default.find({
            $or: [
                { title: keywordRegex },
                { slug: stringSlugRegex }
            ]
        });
        for (var item of songs) {
            const infoSinger = yield singer_model_1.default.findOne({ _id: item.singerId }, { deleted: false });
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
            });
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
            });
            break;
        default:
            break;
    }
});
exports.result = result;
