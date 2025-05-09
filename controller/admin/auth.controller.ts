import { Request, Response } from "express";
import Account from "../../model/account.model";
//[Get]/admin/auth/login
export const login = async (req: Request, res: Response) => {
    res.render("admin/pages/auth/login", {
        pageTitle: "Trang Đăng Nhập"
    })
}
//[POST]/admin/auth/login
export const loginPost = async (req: Request, res: Response) => {

}