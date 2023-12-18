import { Student } from "./student.interface";
import StudentModel from "./student.model";


//post
const createStudentIntoDB = async (studentData: Student) => {
    //const result = await StudentModel.create(student) //builtin static method
    const student = new StudentModel(studentData);//instance
    if (await student.isUserExist(studentData.id)) {
        throw new Error("Sorry this Id user already exist");
    }
    const result = await student.save();
    return result;
}

// getAll
const getAllStudentFromDB = async () => {
    const result = await StudentModel.find();
    return result;
}

// getSingle
const getSingleStudentFromDB = async (id: string) => {
    const result = await StudentModel.findOne({ id: id });
    return result;
}


export const StudentServices = {
    createStudentIntoDB,
    getAllStudentFromDB,
    getSingleStudentFromDB,
}