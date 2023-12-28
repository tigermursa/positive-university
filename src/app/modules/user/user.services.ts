import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { generateStudentId } from "./user.utils";
import { Student } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import StudentModel from "../student/student.model";
import config from "../../config";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

//post
const createUserIntoDB = async (password: string, payload: Student) => {
    // create a user object
    const userData: Partial<TUser> = {};
    // if password not given from the user then the default password will be used
    userData.password = password || (config.default_password as string);

    // set student role
    userData.role = "student";

    // find academic semester info
    const admissionSemester = await AcademicSemester.findById(
        payload.admissionSemester,
    );

    // check if admissionSemester is not null before proceeding
    if (!admissionSemester) {
        throw new Error("Admission semester not found");
    }
    //1st
    const session = await mongoose.startSession();

    try {
        //2nd
        session.startTransaction();
        // set generated id
        userData.id = await generateStudentId(admissionSemester);

        // create a user (transaction-1)
        const newUser = await User.create([userData], { session });

        // create a student
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
        }
        // set id , _id as user
        payload.id = newUser[0].id; // this is embedding id
        payload.user = newUser[0]._id; // this is reference _id

        //(transaction-2)
        const newStudent = await StudentModel.create([payload], { session });

        if (!newStudent.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
        }
        //3rd
        await session.commitTransaction();
        //4th
        await session.endSession();
        return newStudent;
    }
    catch (error) {
        //5th
        await session.abortTransaction();
        //6th
        await session.endSession();
        throw new Error("Failed to create student")
    }

};

export const UserServices = {
    createUserIntoDB,
};
