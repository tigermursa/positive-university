import { Student } from "./student.interface";
import StudentModel from "./student.model";


//post
const createStudentIntoDB = async (student: Student) => {
    const result = await StudentModel.create(student)
    return result;
}

// getAll
const getAllStudentFromDB = async () => {
    const result = await StudentModel.find();
    return result;
}


export const StudentServices = {
    createStudentIntoDB,
    getAllStudentFromDB,
}