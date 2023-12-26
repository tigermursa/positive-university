
import { z, AnyZodObject } from 'zod';

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

const createStudentValidationZodSchema = z.object({
    body: z.object({
        student: z.object({
            name: userNameValidationZodSchema,
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
            admissionSemester:z.string(),
            profileImg: z.string().optional(),
        }),
    }),
});

export const studentValidations = {
    createStudentValidationZodSchema,
};