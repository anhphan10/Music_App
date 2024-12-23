import express, { Express, Request, Response } from "express";
const app: Express = express();
const port: number = 3000;

//Để sử dụng pug
app.set("views", "./views");
app.set("view engine", "pug");
//Hết

app.get("/topics", (req: Request, res: Response) => {
    res.render("client/pages/topics/index");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})