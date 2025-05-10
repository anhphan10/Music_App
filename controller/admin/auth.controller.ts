import { Request, Response } from "express";
import Account from "../../model/account.model";
import { systemConfig } from "../../config/config";
import md5 from "md5";
//[Get]/admin/auth/login
export const login = async (req: Request, res: Response) => {
    res.render("admin/pages/auth/login", {
        pageTitle: "Trang Đăng Nhập"
    })
}
//[POST]/admin/auth/login
export const loginPost = async (req: Request, res: Response) => {
    const user = await Account.findOne({ email: req.body.email }, { deleted: false });
    console.log(user);

    if (!user) {
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`)
        return;
    }

    if (md5(req.body.password) != user.password) {
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`)
        return;
    }

    if (user.status == "inactive") {
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`)
        return
    }
    res.cookie("token", user.token);
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`)
}
//[GET]/admin/auth/logout
export const logout = async (req: Request, res: Response) => {
    res.clearCookie("token");
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`)
}