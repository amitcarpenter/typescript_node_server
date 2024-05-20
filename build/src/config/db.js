"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DB_URI = "mongodb://localhost/ts_practice";
function mongodb_connection() {
    return (0, mongoose_1.connect)(DB_URI)
        .then(() => {
        console.log("Database Connected");
    })
        .catch((err) => {
        console.log("error to connection db" + err);
        return err;
    });
}
exports.default = mongodb_connection;
