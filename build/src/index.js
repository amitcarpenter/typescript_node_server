"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const db_1 = __importDefault(require("./config/db"));
(0, db_1.default)();
const app = (0, express_1.default)();
const PORT = 4011;
app.use("/", userRoutes_1.default);
app.get("/", (req, res) => {
    res.json({ Data: "mera test routes" });
});
app.listen(PORT, () => {
    console.log(`Server is working on ${PORT}`);
});
