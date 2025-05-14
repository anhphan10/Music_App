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
exports.editPatch = exports.edit = exports.createPostSG = exports.create = exports.detail = exports.changeStatus = exports.singer = void 0;
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const config_1 = require("../../config/config");
const singer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singer = yield singer_model_1.default.find({ deleted: false });
    res.render("admin/pages/singers/index", {
        pageTitle: "Quản Lí Ca Sĩ",
        singer: singer
    });
});
exports.singer = singer;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.params.status;
    const id = req.params.id;
    try {
        yield singer_model_1.default.updateOne({ _id: id }, { status: status });
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/singers`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.changeStatus = changeStatus;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const singer = yield singer_model_1.default.findOne({ _id: id });
    res.render("admin/pages/singers/detail", {
        pageTitle: "Trang Chi Tiết Ca Sĩ",
        singer: singer
    });
});
exports.detail = detail;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/singers/create", {
        pageTitle: "Trang Thêm Ca Sĩ"
    });
});
exports.create = create;
const createPostSG = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let avatar = "";
    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    }
    const dataSinger = {
        fullName: req.body.fullName,
        status: req.body.status,
        avatar: avatar
    };
    try {
        const singer = new singer_model_1.default(dataSinger);
        yield singer.save();
    }
    catch (error) {
    }
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/singers`);
});
exports.createPostSG = createPostSG;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const singer = yield singer_model_1.default.findOne({ _id: id });
    res.render("admin/pages/singers/edit", {
        pageTitle: "Trang Sửa Ca Sĩ",
        singer: singer
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const dataSinger = {
        fullName: req.body.fullName,
        status: req.body.status
    };
    if (req.body.avatar) {
        dataSinger["avatar"] = req.body.avatar[0];
    }
    ;
    try {
        yield singer_model_1.default.updateOne({
            _id: id,
        }, dataSinger);
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/singers`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.editPatch = editPatch;
