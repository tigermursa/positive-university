import { Request, Response } from "express";
import { UserServices } from "./user.services";

const createStudent = async (req: Request, res: Response) => {
    try {
        //data will come
        const { password, student: studentData } = req.body;
        //will call services 
        // const zodErrorData = studentValidationZodSchema.parse(student);
        const result = await UserServices.createUserIntoDB(password, studentData);
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

export const UserController = {
    createStudent,
}