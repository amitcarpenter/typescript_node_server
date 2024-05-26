import express, { Application, Request, Response } from "express";
import router from "./src/routes/userRoutes";
import mongodb_connection from "./src/config/db";
import configureApp from "./src/config/routes"
import dotenv from "dotenv";


dotenv.config()
mongodb_connection();

const app: Application = express();
const PORT = process.env.PORT as string;
const APP_URL = process.env.APP_URL as string;

configureApp(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Type Script Learing PlatForm")
});

app.listen(PORT, (): void => {
  console.log(`Server is working on ${APP_URL}`);
});
