import { Student } from './student.interface';
import { Request, Response } from "express";
import { StudentServices } from "./student.services";
import studentValidationZodSchema from './student.validation';


const creteStudent = async (req: Request, res: Response) => {
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
    } catch (err) {
        res.status(200).json({
            success: true,
            message: "something went wrong into the input data !",
            error: err,
        })
    }
};



const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentFromDB()
        //sending response 
        res.status(200).json({
            success: true,
            message: "Students Getting ",
            data: result,
        })
    } catch (error) {
        console.log(error)
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
    } catch (error) {
        console.log(error)
    }
}


export const StudentController = {
    creteStudent,
    getAllStudents,
    getSingleStudent,
}