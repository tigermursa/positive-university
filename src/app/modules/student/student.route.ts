import express from "express";
import { StudentController } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { updateStudentValidationSchema } from "./student.validation";

const router = express.Router()

//router.post("/create-student", StudentController.createStudent)
router.get("/getAll-student", StudentController.getAllStudents)
router.get("/:studentId", StudentController.getSingleStudent)
router.delete("/:studentId", StudentController.deleteStudent)

router.patch(
    '/:id',
    validateRequest(updateStudentValidationSchema),
    StudentController.updateStudent,
);



export const StudentRoutes = router;