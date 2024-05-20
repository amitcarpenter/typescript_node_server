"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the Mongoose schema
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    dept: {
        type: String,
        required: true,
    },
});
// Create the Mongoose model
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
