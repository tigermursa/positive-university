import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { generateStudentId } from "./user.utils";
import { Student } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import StudentModel from "../student/student.model";
import config from "../../config";

//post
const createUserIntoDB = async (password: string, payload: Student) => {
    // create a user object
    const userData: Partial<TUser> = {};
    // if password not given from the user then the default password will be used
    userData.password = password || (config.default_password as string);

    // set student role
    userData.role = "student";

    // find academic semester info
    const admissionSemester = await AcademicSemester.findById(
        payload.admissionSemester,
    );

    // check if admissionSemester is not null before proceeding
    if (!admissionSemester) {
        throw new Error("Admission semester not found");
    }

    // set generated id
    userData.id = await generateStudentId(admissionSemester);

    // create a user
    const newUser = await User.create(userData);

    // create a student
    if (Object.keys(newUser).length) {
        // set id , _id as user
        payload.id = newUser.id; // this is embedding id
        payload.user = newUser._id; // this is reference _id
        const newStudent = await StudentModel.create(payload);
        return newStudent;
    }
};

export const UserServices = {
    createUserIntoDB,
};
