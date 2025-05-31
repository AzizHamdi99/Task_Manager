import mongoose, { Schema } from "mongoose";
import { unique } from "next/dist/build/utils";

const userShcema = new Schema({
    fullname: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true
    }
})