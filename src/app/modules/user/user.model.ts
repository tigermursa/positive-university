import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { TUser, UserModelWithStatic } from "./user.interface";
import config from "../../config";

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


//pre saving middleware
userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password,
        Number(config.bcrypt_salt));
    next();
})

//post saving middleware/ will sent empty password field for security
userSchema.post('save', async function (doc, next) {
    doc.password = " ";
    next();
})


// NEW STATIC METHOD
userSchema.statics.isUserExists = async function (id: string): Promise<TUser | null> {
    const existingUser = await this.findOne({ id: id });
    return existingUser;
};

//model
export const User = model<TUser, UserModelWithStatic>("User", userSchema);


