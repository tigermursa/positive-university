import { NextFunction, Request, Response } from "express";


const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    const statusCode = 500;
    const message = "Something went wrong here (I am from globalError Handler)"

    return res.status(statusCode).json({
        success: false,
        message,
        error:`error reason is ${err.message}` ,
    })
}

export default globalErrorHandler;
