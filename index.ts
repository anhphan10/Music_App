import express, { Express } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import clientRouter from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./config/config";
import path from 'path';
import bodyParser from "body-parser";
import methodOverride from 'method-override';
import flash from "flash";
import cookieParser from "cookie-parser";
import session from "express-session";
dotenv.config();
database.connect();
const app: Express = express();
const port: number | string = process.env.PORT || 3000;

//
declare module 'express-serve-static-core' {
    interface Request {
        flash(type: string, message: string): void;
        flash(type: string): string[];
    }
}
//

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
//Nhúng file tĩnh
app.use(express.static(`${__dirname}/public`));
//Hết
//Để sử dụng pug
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
//Hết
//flash
app.use(cookieParser("keyboard cat"));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
app.use(flash());
//end
//TinyMCE
app.use("/tinymce", express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//Het

//Tọa Biến Toàn Cục
app.locals.prefixAdmin = systemConfig.prefixAdmin
//Hết
clientRouter(app);
adminRoutes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})