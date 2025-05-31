import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    fullname: stron
}


const userShcema = new Schema({
    fullname: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true
    },
    password: { type: String, required: true },
    pic: { type: String },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },

},
    { timestamps: true })