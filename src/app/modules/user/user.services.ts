
import { object } from "zod";
import config from "../../config";
import { Student } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import StudentModel from "../student/student.model";


//post
const createUserIntoDB = async (password: string, studentData: Student) => {
    // if (await UserModel.isUserExists(studentData.id)) {
    //     throw new Error("Sorry this Id user already exist");
    // }


    //create a user object
    const userData: Partial<TUser> = {};
    //if password not given from user then default password will go
    userData.password = password || (config.default_password as string);
    // if(!password){
    //     user.password = config.default_password as string;
    // }else{
    //     user.password = password;
    // }

    //set student role
    userData.role = "student";

    //setting manually generated id
    userData.id = "202310001"
    //create a user
    const newUser = await User.create(userData) //builtin static method

    //create a student
    if (Object.keys(newUser).length) {
        //set id , _id as user
        studentData.id = newUser.id; // this is embedding id 
        studentData.user = newUser._id; // this is reference _id 
        const newStudent = await StudentModel.create(studentData);
        return newStudent;
    }


}

export const UserServices = {
    createUserIntoDB
}