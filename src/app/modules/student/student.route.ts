import express from "express";
import { StudentController } from "./student.controller";

const router = express.Router()

router.post("/create-student", StudentController.creteStudent)



export const StudentRoutes = router;