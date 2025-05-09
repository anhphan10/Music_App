import { Request, Response, NextFunction } from "express"
export const createSinger = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.fullName) {
        res.redirect("back");
        return;
    }
    next();
}