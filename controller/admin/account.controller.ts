import { Request, Response } from "express";
import { systemConfig } from "../../config/config";
import Account from "../../model/account.model";
import md5 from "md5";
//[Get]/amin/accounts
export const index = async (req: Request, res: Response) => {
    res.render("admin/pages/account/index", {
        pageTitle: "Trang Tạo Tài Khoản"
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
        password: req.body.password,
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
        req.body.password = md5(req.body.password)
        const records = new Account(dataAcc);
        await records.save();
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
    }
}


