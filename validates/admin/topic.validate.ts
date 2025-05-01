import { Request, Response, NextFunction } from "express"
export const createTopic = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.title) {
        res.redirect("back");
        return;
    }
    next();
}