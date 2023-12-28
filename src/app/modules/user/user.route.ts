
import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { studentValidations } from "../student/student.validation";

const router = express.Router();



router.post(
    "/create-student",
    validateRequest(studentValidations.createStudentValidationSchema), // Use the specific schema
    UserController.createStudent
);

export const UserRoutes = router;
