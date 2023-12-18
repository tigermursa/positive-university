import express from "express";
import { StudentController } from "./student.controller";

const router = express.Router()

router.post("/create-student", StudentController.creteStudent)
router.get("/getAll-student", StudentController.getAllStudents)



export const StudentRoutes = router;