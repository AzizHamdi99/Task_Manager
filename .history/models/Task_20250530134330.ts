import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
    text: {
        type: String, required: true
    },
    completed: {
        type: Boolean, required: true
    }
})

const taskSchema = new Schema({
    title: {
        type: String, required: true
    },
    describtion: {
        type: String
    },
    priority: {
        type: String, enum: ["Low", "Meduim", "High"], default: "Meduim"
    },
    priority: {
        type: String, enum: ["Low", "Meduim", "High"], required: true
    }
})