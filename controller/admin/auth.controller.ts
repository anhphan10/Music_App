import { Request , Response } from "express";
//[Get]/admin/auth/login
export const login = async (req: Request , res: Response) => {
    res.render("admin/pages/auth/login",{
        pageTitle:"Trang Đăng Nhập"
    })
}