import express, { Express } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import clientRouter from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./config/config";
import path from "path";
dotenv.config();
database.connect();
const app: Express = express();
const port: number | string = process.env.PORT || 3000;
//Nhúng file tĩnh
app.use(express.static("public"));
//Hết
//Để sử dụng pug
app.set("views", "./views");
app.set("view engine", "pug");
//Hết
//TinyMCE
app.use("/tinymce", express.static(path.join(__dirname, "node_modules" , "tinymce")));
//Het

//Tọa Biến Toàn Cục
app.locals.prefixAdmin = systemConfig.prefixAdmin
//Hết
clientRouter(app);
adminRoutes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})