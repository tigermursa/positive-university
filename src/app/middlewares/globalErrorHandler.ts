import { NextFunction, Request, Response } from "express";


const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    const statusCode = 500;
    const message = "Something went wrong here!"

    return res.status(statusCode).json({
        success: false,
        message,
        error: err,
    })
}

export default globalErrorHandler;
