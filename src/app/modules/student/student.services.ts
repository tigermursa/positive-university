import { Student } from "./student.interface";
import StudentModel from "./student.model";


//post
const createStudentIntoDB = async (studentData: Student) => {
    if (await StudentModel.isUserExists(studentData.id)) {
        throw new Error("Sorry this Id user already exist");
    }
    const result = await StudentModel.create(studentData) //builtin static method
    return result;
}

//OLD CODE FOT INSTANCE
// const student = new StudentModel(studentData);//instance
// if (await student.isUserExist(studentData.id)) {
//     throw new Error("Sorry this Id user already exist");
// }
// const result = await student.save()


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