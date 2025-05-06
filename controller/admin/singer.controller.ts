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
        await Singer.updateOne({ _id: id }, { status: status });
        res.redirect(`/${systemConfig.prefixAdmin}/singers`);
    } catch (error) {
        console.log(error);
    }
}
//[Get]/admin/singers/detail/:id
export const detail = async (req: Request, res: Response) => {
    const id = req.params.id;
    const singer = await Singer.findOne({ _id: id });
    res.render("admin/pages/singers/detail", {
        pageTitle: "Trang Chi Tiết Ca Sĩ",
        singer: singer
    })
}

//[Get]/admin/singers/create
export const create = async (req: Request, res: Response) => {
    res.render("admin/pages/singers/create", {
        pageTitle: "Trang Thêm Ca Sĩ"
    })
}
//[Post]/admin/singers/create
export const createPostSG = async (req: Request, res: Response) => {
    let avatar = "";
    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    }
    interface Singer {
        fullName: String,
        status: String,
        avatar: String
    }
    const dataSinger: Singer = {
        fullName: req.body.fullName,
        status: req.body.status,
        avatar: avatar
    }
    try {
        const singer = new Singer(dataSinger);
        await singer.save();
    } catch (error) {

    }
    res.redirect(`/${systemConfig.prefixAdmin}/singers`);
}
//[Get]/admin/edit/id
export const edit = async (req: Request, res: Response) => {
    const id = req.params.id;
    const singer = await Singer.findOne({ _id: id });
    res.render("admin/pages/singers/edit", {
        pageTitle: "Trang Sửa Ca Sĩ",
        singer: singer
    })
}
//[Patch]/admin/edit/id
export const editPatch = async (req: Request, res: Response) => {
    const id = req.params.id;
    const dataSinger = {
        fullName: req.body.fullName,
        status: req.body.status
    };
    if (req.body.avatar) {
        dataSinger["avatar"] = req.body.avatar[0]
    };
    try {
        await Singer.updateOne({
            _id: id,
        }, dataSinger);
        res.redirect(`/${systemConfig.prefixAdmin}/singers`);
    } catch (error) {
        console.log(error)
    }
}
