import { Schema, model } from "mongoose";
import { Guardian, LocalGuardian, Student, UserName } from "./student.interface";

const userNameSchema = new Schema<UserName>({
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true }
});

const guardianSchema = new Schema<Guardian>({
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    motherContactNo: { type: String, required: true }
});

const localGuardianSchema = new Schema<LocalGuardian>({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true }
});

const studentSchema = new Schema<Student>({
    id: { type: String, required: true },
    name: userNameSchema,
    gender: { type: String, enum: ['male', 'female'], required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: { type: String, enum: ['A+', 'A-', 'B', 'B+', 'B-', 'O+'] },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: { type: String },
    isActive: { type: String, enum: ['active', 'blocked'], required: true }
});

const StudentModel = model<Student>('Student', studentSchema);

export default StudentModel;
