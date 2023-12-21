import { Student } from "./student.interface";
import StudentModel from "./student.model";

/*
//post
const createStudentIntoDB = async (studentData: Student) => {
    if (await StudentModel.isUserExists(studentData.id)) {
        throw new Error("Sorry this Id user already exist");
    }
    const result = await StudentModel.create(studentData) //builtin static method
    return result;
}

*/

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

// delete
const deleteStudentFromDB = async (id: string) => {
    const result = await StudentModel.updateOne({ id: id }, { isDeleted: true });
    return result;
}

//update 
const updateStudentFromDB = async (id: string, updatedData: Partial<Student>) => {
    try {
        const result = await StudentModel.updateOne({ id }, { $set: updatedData });
        return result;
    } catch (error: any) {
        throw new Error("Error updating student: " + error.message);
    }
};

export const StudentServices = {
    //createStudentIntoDB,
    getAllStudentFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    updateStudentFromDB,
}