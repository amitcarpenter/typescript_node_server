import express, { Request, Response } from "express";
import router from "./routes/userRoutes";
import mongodb_connection from "./config/db";

mongodb_connection();
const app = express();

const PORT = 4011;

app.use("/", router);

app.get("/", (req: Request, res: Response) => {
  res.json({ Data: "mera test routes" });
});

app.listen(PORT, (): void => {
  console.log(`Server is working on ${PORT}`);
});