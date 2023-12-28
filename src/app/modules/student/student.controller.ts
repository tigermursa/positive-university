import { Student } from './student.interface';
import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.services";
import sendResponse from '../../utils/sendResponds';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';


const getAllStudents = catchAsync(async (req, res, next) => {
    const result = await StudentServices.getAllStudentFromDB()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student ia all getting successfully !",
        data: result,
    })

})


const getSingleStudent = catchAsync(async (req, res, next) => {
    const studentId = req.params.studentId;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student ia single getting successfully !",
        data: result,
    })
})

const deleteStudent = catchAsync(async (req, res, next) => {
    const studentId = req.params.studentId;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student deleted successfully !",
        data: result,
    })
})


//update 
const updateStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { student } = req.body;
    const result = await StudentServices.updateStudentFromDB(id, student);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is updated succesfully',
        data: result,
    });
});


export const StudentController = {

    getAllStudents,
    getSingleStudent,
    deleteStudent,
    updateStudent,
}