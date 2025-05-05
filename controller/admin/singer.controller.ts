import { Request, Response } from "express";
import Singer from "../../model/singer.model";
import { systemConfig } from "../../config/config";
//[Get]/admin/singer
export const singer = async (req: Request, res: Response) => {
    const singer = await Singer.find({ deleted: false });

    res.render("admin/pages/singers/index", {
        pageTitle: "Quản Lí Ca Sĩ",
        singer: singer
    });
}
//[Patch]/admin/singers/change-status/status/id
export const changeStatus = async (req: Request, res: Response) => {
    const status = req.params.status;
    const id = req.params.id;
    try {
        await Singer.updateOne({_id:id},{status:status});
        res.redirect(`/${systemConfig.prefixAdmin}/singers`);
    } catch (error) {
        console.log(error);
    }
}