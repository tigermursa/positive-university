import { Student } from './student.interface';
import { Request, Response } from "express";
import { StudentServices } from "./student.services";
import studentValidationZodSchema from './student.validation';

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


const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentFromDB()
        //sending response 
        res.status(200).json({
            success: true,
            message: "Students Getting ",
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: true,
            message: "something went wrong ! ",
            error: error.message,
        })
    }
};


const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const studentId = req.params.studentId;
        const result = await StudentServices.getSingleStudentFromDB(studentId);
        //sending response 
        res.status(200).json({
            success: true,
            message: "Single Student Getting ",
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: true,
            message: "something went wrong ! ",
            error: error.message,
        })
    }
}

const deleteStudent = async (req: Request, res: Response) => {
    try {
        const studentId = req.params.studentId;
        const result = await StudentServices.deleteStudentFromDB(studentId);
        //sending response 
        res.status(200).json({
            success: true,
            message: "Student deleted successfully",
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: true,
            message: "something went wrong ! ",
            error: error.message,
        })
    }
}


//update 
const updateStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params
        const updatedData = req.body.student;
        const result = await StudentServices.updateStudentFromDB(studentId, updatedData);
        res.status(200).json({
            success: true,
            message: "single User is Updated successfully",
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}


export const StudentController = {
   // createStudent,
    getAllStudents,
    getSingleStudent,
    deleteStudent,
    updateStudent,
}