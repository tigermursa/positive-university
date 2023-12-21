import { Student } from './student.interface';
import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.services";
import studentValidationZodSchema from './student.validation';
import sendResponse from '../../utils/sendResponds';
import httpStatus from 'http-status';

/*
const createStudent = async (req: Request, res: Response) => {
    try {
        //data will come
        const student = req.body.student;
        //will call services 
        const zodErrorData = studentValidationZodSchema.parse(student);
        const result = await StudentServices.createStudentIntoDB(zodErrorData);
        //sending response 
        res.status(200).json({
            success: true,
            message: "Student created successfully !",
            data: result,
        })
    } catch (err: any) {
        res.status(200).json({
            success: false,
            message: "something went wrong into the input data !",
            error: err.message,
        })
    }
};
*/


const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await StudentServices.getAllStudentFromDB()
        //sending response 
        // res.status(200).json({
        //     success: true,
        //     message: "Students Getting ",
        //     data: result,
        // })
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Student ia all getting successfully !",
            data: result,
        })
    } catch (error) {
        // res.status(500).json({
        //     success: true,
        //     message: "something went wrong ! ",
        //     error: error.message,
        // })
        next(error);
    }
};


const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId = req.params.studentId;
        const result = await StudentServices.getSingleStudentFromDB(studentId);
        //sending response 
        // res.status(200).json({
        //     success: true,
        //     message: "Single Student Getting ",
        //     data: result,
        // })
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Student ia single getting successfully !",
            data: result,
        })
    } catch (error: any) {
        // res.status(500).json({
        //     success: true,
        //     message: "something went wrong ! ",
        //     error: error.message,
        // })
        next(error);
    }
}

const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId = req.params.studentId;
        const result = await StudentServices.deleteStudentFromDB(studentId);
        //sending response 
        // res.status(200).json({
        //     success: true,
        //     message: "Student deleted successfully",
        //     data: result,
        // })
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Student deleted successfully !",
            data: result,
        })

    } catch (error: any) {
        // res.status(500).json({
        //     success: true,
        //     message: "something went wrong ! ",
        //     error: error.message,
        // })
        next(error);
    }
}


//update 
const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId } = req.params
        const updatedData = req.body.student;
        const result = await StudentServices.updateStudentFromDB(studentId, updatedData);
        // res.status(200).json({
        //     success: true,
        //     message: "single User is Updated successfully",
        //     data: result,
        // })
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "single User is Updated successfully",
            data: result,
        })
    } catch (error: any) {
        // res.status(500).json({
        //     success: false,
        //     message: "Internal Server Error",
        //     error: error.message,
        // });
        next();
    }
}


export const StudentController = {
    // createStudent,
    getAllStudents,
    getSingleStudent,
    deleteStudent,
    updateStudent,
}