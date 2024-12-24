import express, { Express, Request, Response } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import Topic from "./model/topic.model";
dotenv.config();
database.connect();
const app: Express = express();
const port: number|string = process.env.PORT || 3000;
//Để sử dụng pug
app.set("views", "./views");
app.set("view engine", "pug");
//Hết
app.get("/topics", async (req: Request, res: Response) => {
    const topic = await Topic.find({
        deleted: false
    });
    console.log(topic);
    res.render("client/pages/topics/index");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})