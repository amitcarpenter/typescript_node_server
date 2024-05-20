import { Request, Response } from "express";

const homePage = (req: Request, res: Response) => {
  res.send("Hello Home Page");
};

export = { homePage };
