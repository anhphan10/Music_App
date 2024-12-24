import express, { Express } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import clientRouter from "./routes/client/index.route";
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

clientRouter(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})