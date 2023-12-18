import { Student } from './student.interface';
import { Request, Response } from "express";
import { StudentServices } from "./student.services";


const creteStudent = async (req: Request, res: Response) => {
    try {
        //data will come
        const student = req.body.student;
        //will call services 
        const result = await StudentServices.createStudentIntoDB(student);
        //sending response 
        res.status(200).json({
            success: true,
            message: "Student created !",
            data: result,
        })
    } catch (error) {
        console.log(error)
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

}


export const StudentController = {
    creteStudent,
    getAllStudents,
}