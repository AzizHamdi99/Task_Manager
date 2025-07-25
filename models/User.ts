import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    fullname: string,
    email: string,
    password: string,
    pic?: string,
    role: "USER" | "ADMIN"
}


const UserSchema = new Schema<IUser>({
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
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User