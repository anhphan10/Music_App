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
exports.changeStatus = exports.editPatchTP = exports.editTopic = exports.detailTopic = exports.deleteTopic = exports.createPost = exports.create = exports.topic = void 0;
const topic_model_1 = __importDefault(require("../../model/topic.model"));
const config_1 = require("../../config/config");
const topic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/topics/index", {
        pageTitle: "Quản Lí Chủ Đề",
        topics: topics
    });
});
exports.topic = topic;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({ deleted: false });
    res.render("admin/pages/topics/create", {
        pageTitle: "Trang Thêm Mới Chủ Đề",
        topics: topics
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let avatar = "";
    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    }
    ;
    const dataTopic = {
        title: req.body.title,
        avatar: avatar,
        description: req.body.description,
        status: req.body.status
    };
    try {
        const topic = new topic_model_1.default(dataTopic);
        yield topic.save();
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/topics`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createPost = createPost;
const deleteTopic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield topic_model_1.default.updateOne({ _id: id }, { deleted: true });
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/topics`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteTopic = deleteTopic;
const detailTopic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = yield topic_model_1.default.findOne({ _id: req.params.id }, { deleted: false });
    res.render("admin/pages/topics/detail", {
        pageTitle: "Trang Chi Tiết Chủ Đề",
        topic: topic
    });
});
exports.detailTopic = detailTopic;
const editTopic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = yield topic_model_1.default.findOne({ _id: req.params.id }, { deleted: false });
    res.render("admin/pages/topics/edit", {
        pageTitle: "Trang Chỉnh Sửa Chủ Đề",
        topic: topic
    });
});
exports.editTopic = editTopic;
const editPatchTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const dataTopic = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    };
    if (req.body.avatar) {
        dataTopic["avatar"] = req.body.avatar[0];
    }
    ;
    try {
        yield topic_model_1.default.updateOne({ _id: id }, dataTopic);
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/topics`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.editPatchTP = editPatchTP;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const status = req.params.status;
    try {
        yield topic_model_1.default.updateOne({ _id: id }, { status: status });
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/topics`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.changeStatus = changeStatus;
