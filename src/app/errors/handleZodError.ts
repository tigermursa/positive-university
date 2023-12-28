import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface/error";

const handleZodError = (err: ZodError) => {

    const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1], //length-1 means last index 
            message: issue.message,
        }
    })

    const statusCode = 400;


    return {
        statusCode,
        message: "Validation error",
        errorSources,
    }

}

export default handleZodError;