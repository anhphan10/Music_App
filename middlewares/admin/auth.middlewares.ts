import { systemConfig } from "../../config/config";
import Account from "../../model/account.model";
import { Request, Response, NextFunction } from "express";
export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.cookies.token) {
        console.log("no token found")
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`)
    }
    else {
        const user = await Account.findOne({
            token: req.cookies.token
        })
        if (!user) {
            res.clearCookie("token");
            res.redirect(`/${systemConfig.prefixAdmin}/auth/login`)

        }
        else {
            next();
        }
    }

}