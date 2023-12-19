
import { Model } from "mongoose";

// //NEW STATIC METHOD..
export interface StudentModelWithStatic extends Model<Student> {
    isUserExists(id: string): Promise<Student | null>;
}
export type Guardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
};


export type UserName = {
    firstName: string;
    middleName: string;
    lastName: string;
};

export type LocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
}

export type Student = {
    id: string,
    name: UserName,
    password: string,
    gender: "male" | "female";
    dateOfBirth: string;
    email: string;
    avatar?: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: "A+" | "A-" | "B" | "B+" | "B-" | "O+";
    presentAddress: string;
    permanentAddress: string;
    guardian: Guardian;
    localGuardian: LocalGuardian;
    profileImg?: string;
    isActive: "active" | "blocked";
}



//FOR INSTANCE
// export type StudentMethods = {
//     isUserExist(id: string): Promise<Student | null>;
// }

// export type StudentModelN = Model<Student, Record<string, never>,
//     StudentMethods>;