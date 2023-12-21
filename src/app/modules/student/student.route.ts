import express from "express";
import { StudentController } from "./student.controller";

const router = express.Router()

//router.post("/create-student", StudentController.createStudent)
router.get("/getAll-student", StudentController.getAllStudents)
router.get("/:studentId", StudentController.getSingleStudent)
router.delete("/:studentId", StudentController.deleteStudent)
router.put("/:studentId", StudentController.updateStudent)



export const StudentRoutes = router;