import mongoose from "mongoose";
import { Student } from "./student.interface";
import StudentModel from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";

/*
//post
const createStudentIntoDB = async (studentData: Student) => {
    if (await StudentModel.isUserExists(studentData.id)) {
        throw new Error("Sorry this Id user already exist");
    }
    const result = await StudentModel.create(studentData) //builtin static method
    return result;
}

*/

//OLD CODE FOT INSTANCE
// const student = new StudentModel(studentData);//instance
// if (await student.isUserExist(studentData.id)) {
//     throw new Error("Sorry this Id user already exist");
// }
// const result = await student.save()


// getAll
const getAllStudentFromDB = async () => {
    const result = await StudentModel.find();
    return result;
}

// getSingle
const getSingleStudentFromDB = async (id: string) => {
    const result = await StudentModel.findOne({ id: id }); //out id that is why no find BY ID
    return result;
}

// delete
const deleteStudentFromDB = async (id: string) => {
    //1st
    const session = await mongoose.startSession();

    try {
        //2nd
        session.startTransaction();

        const deletedStudent = await StudentModel.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedStudent) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
        }

        // get user _id from deletedStudent
        const userId = deletedStudent.user;

        const deletedUser = await User.findByIdAndUpdate(   //findByIdAndUpdate because using out id 
            userId,
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedUser) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
        }
        //3rd success
        await session.commitTransaction();
        //4th
        await session.endSession();

        return deletedStudent;
    } catch (err) {
        //5th
        await session.abortTransaction();
        //6th
        await session.endSession();
        throw new Error('Failed to delete student');
    }
};

//update 
const updateStudentFromDB = async (id: string, payload: Partial<Student>) => {
    const { name, guardian, localGuardian, ...remainingStudentData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingStudentData,
    };

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }

    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }

    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }

    const result = await StudentModel.findByIdAndUpdate(id, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
    return result;
};

export const StudentServices = {
    //createStudentIntoDB,
    getAllStudentFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    updateStudentFromDB,
}

//if there is no user and trying to delete that user handel this error!