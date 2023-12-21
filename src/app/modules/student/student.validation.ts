import { z } from 'zod';

const userNameValidationZodSchema = z.object({
    firstName: z.string().min(1).max(10),
    middleName: z.string().min(1),
    lastName: z.string().min(1),
});

const guardianValidationZodSchema = z.object({
    fatherName: z.string().min(1),
    fatherOccupation: z.string().min(1),
    fatherContactNo: z.string().min(1),
    motherName: z.string().min(1),
    motherOccupation: z.string().min(1),
    motherContactNo: z.string().min(1),
});

const localGuardianValidationZodSchema = z.object({
    name: z.string().min(1),
    occupation: z.string().min(1),
    contactNo: z.string().min(1),
    address: z.string().min(1),
});

const studentValidationZodSchema = z.object({
    //id: z.string().min(1),
    name: userNameValidationZodSchema,
    //password: z.string().min(7),
    gender: z.enum(['male', 'female']),
    dateOfBirth: z.string().min(1),
    email: z.string().min(1),
    avatar: z.string().optional(),
    contactNo: z.string().min(1),
    emergencyContactNo: z.string().min(1),
    bloodGroup: z.enum(['A+', 'A-', 'B', 'B+', 'B-', 'O+']).optional(),
    presentAddress: z.string().min(1),
    permanentAddress: z.string().min(1),
    guardian: guardianValidationZodSchema,
    localGuardian: localGuardianValidationZodSchema,
    profileImg: z.string().optional(),
    isActive: z.enum(['active', 'blocked']),
    isDeleted: z.boolean()
});

export default studentValidationZodSchema;
