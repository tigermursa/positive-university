import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

//the army middlewares
const validateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Validation
            await schema.parseAsync({
                body: req.body,
            });
            next(); // Call next if validation passes
        } catch (error) {
            next(error);
        }
    };
};

export default validateRequest;