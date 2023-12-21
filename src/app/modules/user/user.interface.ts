import { Model } from "mongoose";

// //NEW STATIC METHOD..
export interface UserModelWithStatic extends Model<TUser> {
    isUserExists(id: string): Promise<TUser | null>;
}

export type TUser = {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    role: "admin" | "student" | "faculty";
    status: "in-Progress" | "blocked";
    isDeleted: boolean;
}

// export type NewUser = {
//     password: string;
//     role: string;
//     id: string;
// }