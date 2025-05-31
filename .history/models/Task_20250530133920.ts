import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
    text: {
        type: String,
    }
})