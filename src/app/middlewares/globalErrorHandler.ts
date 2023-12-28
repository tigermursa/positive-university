import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/error";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import handleMngValidationError from "../errors/handleMongooseVldError";


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    //setting default values
    let statusCode = 500;
    let message = "Something went wrong here (I am from globalError Handler)"

    let errorSources: TErrorSource = [{
        path: "",
        message: "Something went wrong here",
    }];





    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err?.name === "ValidationError") {
        const simplifiedError = handleMngValidationError(err)
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }


    //ultimately 
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.NODE_ENV === "development" ? err?.stack : null,
    })
}

export default globalErrorHandler;
