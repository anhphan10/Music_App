import { Request, Response } from "express";
import Account from "../../model/account.model";
import { systemConfig } from "../../config/config";
import md5 from "md5";
//[Get]/admin/auth/login
export const login = async (req: Request, res: Response) => {
    res.render("admin/pages/auth/login", {
        pageTitle: "Trang Đăng Nhập",
    })
}
//[POST]/admin/auth/login
export const loginPost = async (req: Request, res: Response) => {
    const user = await Account.findOne({ email: req.body.email }, { deleted: false });
    if (!user) {
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
    }

    if (md5(req.body.password) != user.password) {
        return res.render("admin/pages/auth/login", {
            errorMessage: `Sai Mật Khẩu!`,
        });
    }

    if (user.status == "inactive") {
        return res.render("admin/pages/auth/login", {
            errorMessage: `Tài Khoản Không Hoạt Động`,
        });
    }
    res.cookie("token", user.token);
    res.render("admin/pages/dashboard/index", {
        successMessage: `Đăng Nhập Thành Công!`,
    });

}
//[GET]/admin/auth/logout
export const logout = async (req: Request, res: Response) => {
    res.clearCookie("token");
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`)
}
