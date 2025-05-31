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
    description: {
        type: String
    },
    priority: {
        type: String, enum: ["Low", "Meduim", "High"], default: "Meduim"
    },
    status: {
        type: String, enum: ["Pending", "In Progrees", "Completed"], default: "Pending"
    },
    dueDate: {
        type: Date, require: true
    },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    attachments: [{ type: String }],
    todoCheckList: [todoSchema],
    progress: { type: Number, default: 0 },
}, { timestamps: true })

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
export default Task