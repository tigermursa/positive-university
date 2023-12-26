import httpStatus from 'http-status';
import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserServices } from "./user.services";
import sendResponse from "../../utils/sendResponds";
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res, next) => {
    //data will come
    const { password, student: studentData } = req.body;
    //will call services 
    // const zodErrorData = studentValidationZodSchema.parse(student);
    const result = await UserServices.createUserIntoDB(password, studentData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student created successfully !",
        data: result,
    })
});

export const UserController = {
    createStudent,
}