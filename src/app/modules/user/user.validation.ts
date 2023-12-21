import { z } from "zod";

export const userZodValidationSchema = z.object({
    //id: z.string().max(15),
    password: z.string({
        invalid_type_error: "Password must be string"
    }).max(20).min(5).optional(),
    //needsPasswordChange: z.boolean().optional().default(true),
    // role: z.enum(["admin", "student", "faculty"]),
    //status: z.enum(["in-Progress", "blocked"]).default("in-Progress"),
    // isDeleted: z.boolean().optional().default(false),
});

export const UserValidation = {
    userZodValidationSchema,
} 