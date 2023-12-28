import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";

import config from "../config";
import handleZodError from "../errors/handleZodError";
import handleMngValidationError from "../errors/handleMongooseVldError";
import handleCastErrorError from "../errors/handleCastErrorError";
import handleDuplicateError from "../errors/handleDuplicateError";
import { TErrorSources } from "../interface/error";
import AppError from "../errors/AppError";


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    //setting default values
    let statusCode = 500;
    let message = "Something went wrong here (I am from globalError Handler)"

    let errorSources: TErrorSources = [{
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
    } else if (err?.name === "CastError") {
        const simplifiedError = handleCastErrorError(err)
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err?.name === 11000) {
        const simplifiedError = handleDuplicateError(err)
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorSources = [
            {
                path: " ",
                message: err?.message,
            },
        ];
    } else if (err instanceof Error) {
        message = err?.message;
        errorSources = [
            {
                path: " ",
                message: err?.message,
            },
        ];
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
