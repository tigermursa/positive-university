import { Schema, model } from "mongoose";
import { TUser, UserModelWithStatic } from "./user.interface";

const userSchema = new Schema<TUser, UserModelWithStatic>({
    id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ["admin", "student", "faculty"],
        required: true,
    },
    status: {
        type: String,
        enum: ["in-Progress", "blocked"],
        required: true,
        default: "in-Progress"
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});


// NEW STATIC METHOD
userSchema.statics.isUserExists = async function (id: string): Promise<TUser | null> {
    const existingUser = await this.findOne({ id: id });
    return existingUser;
};

//model
export const User = model<TUser, UserModelWithStatic>("User", userSchema);


