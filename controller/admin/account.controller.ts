import { Request, Response } from "express";
import { systemConfig } from "../../config/config";
import Account from "../../model/account.model";
import md5 from "md5";
//[Get]/amin/accounts
export const index = async (req: Request, res: Response) => {
    const account = await Account.find({ deleted: false });
    res.render("admin/pages/account/index", {
        pageTitle: "Trang Tạo Tài Khoản",
        account: account
    })
}
//[Get]/amin/accounts/create
export const create = async (req: Request, res: Response) => {
    res.render("admin/pages/account/create", {
        pageTitle: "Trang Thêm Mới Tài Khoản"
    })
}
//[POST]/amin/accounts/create
export const createAcc = async (req: Request, res: Response) => {
    let avatar = "";
    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    }
    interface Account {
        fullName: String,
        email: String,
        password: String,
        phone: String,
        status: String,
        avatar: String
    }
    const dataAcc: Account = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: md5(req.body.password),
        phone: req.body.phone,
        status: req.body.status,
        avatar: avatar
    }
    const emailExist = await Account.findOne({
        email: req.body.email,
        deleted: false
    })
    if (emailExist) {
        res.redirect("back");
    }
    else {
        const records = new Account(dataAcc);
        await records.save();
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
    }
}

//[Patch]/admin/change-status/:status/:id
export const changeStatus = async (req: Request, res: Response) => {
    const status = req.params.status;
    const id = req.params.id;
    try {
        await Account.updateOne({ _id: id }, { status: status });
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
    } catch (error) {
        console.log(error);
    }
}

export const deleteAcc = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        await Account.updateOne({ _id: id }, { deleted: true });
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
    } catch (error) {
        console.log(error);
    }
}

//[Get]/admin/accounts/edit/:id
export const edit = async (req: Request, res: Response) => {
    const account = await Account.findOne({ _id: req.params.id }, { deleted: false });
    res.render("admin/pages/account/edit", {
        pageTitle: "Trang Sửa Tài Khoản",
        account: account
    })
}
//[Patch]/admin/accounts/edit/:id
export const editAcc = async (req: Request, res: Response) => {
    const id = req.params.id;
    const dataAccount = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        status: req.body.status
    };
    if (req.body.avatar) {
        dataAccount["avatar"] = req.body.avatar[0];
    };
    if (req.body.password) {
        dataAccount["password"] = md5(req.body.password);
    }
    try {
        await Account.updateOne({
            _id: id,
        }, dataAccount);
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
    } catch (error) {
        console.log(error)
    }
}
