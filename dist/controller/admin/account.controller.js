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
exports.deleteAcc = exports.changeStatus = exports.createAcc = exports.create = exports.index = void 0;
const config_1 = require("../../config/config");
const account_model_1 = __importDefault(require("../../model/account.model"));
const md5_1 = __importDefault(require("md5"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield account_model_1.default.find({ deleted: false });
    res.render("admin/pages/account/index", {
        pageTitle: "Trang Tạo Tài Khoản",
        account: account
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/account/create", {
        pageTitle: "Trang Thêm Mới Tài Khoản"
    });
});
exports.create = create;
const createAcc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let avatar = "";
    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    }
    const dataAcc = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: (0, md5_1.default)(req.body.password),
        phone: req.body.phone,
        status: req.body.status,
        avatar: avatar
    };
    const emailExist = yield account_model_1.default.findOne({
        email: req.body.email,
        deleted: false
    });
    if (emailExist) {
        res.redirect("back");
    }
    else {
        const records = new account_model_1.default(dataAcc);
        yield records.save();
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/accounts`);
    }
});
exports.createAcc = createAcc;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.params.status;
    const id = req.params.id;
    try {
        yield account_model_1.default.updateOne({ _id: id }, { status: status });
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/accounts`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.changeStatus = changeStatus;
const deleteAcc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield account_model_1.default.updateOne({ _id: id }, { deleted: true });
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/accounts`);
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteAcc = deleteAcc;
