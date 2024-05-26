import express, { Application } from "express";
import cookieParser from "cookie-parser";
import { authenticateUser } from "../middlewares/auth";

import user_router from "../routes/userRoutes";
import category_router from "../routes/categoryRoutes";
import product_router from "../routes/productRoutes";
import inventory_router from "../routes/inventoryRoutes";
import tags_router from "../routes/tagRoutes";
import review_router from "../routes/reviewRoutes";
import setting_router from "../routes/settingRoutes";

const configureApp = (app: Application): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use("/api", user_router);
  app.use("/api/categories", authenticateUser, category_router);
  app.use("/api/products", authenticateUser, product_router);
  app.use("/api/inventory", authenticateUser, inventory_router);
  app.use("/api/tags", authenticateUser, tags_router);
  app.use("/api/reviews", authenticateUser, review_router);
  app.use("/api/settings", authenticateUser, setting_router);
};

export default configureApp;
