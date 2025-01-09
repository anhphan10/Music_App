import { Request , Response } from "express";
//[Get]/admin/dashboard
export const dashboard = async (req: Request , res: Response) => {
    res.render("admin/pages/dashboard/index",{
        pageTitle:"Tổng Quan"
    })
}