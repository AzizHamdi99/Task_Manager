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
    status: {
        type: String, enum: ["Pending", "In Progrees", "Completed"], default: "Pending"
    }

})