import { NextFunction, Request, RequestHandler, Response } from "express";

//do not use try catch use this higherOrder function
const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(err => next(err));
    }
}

export default catchAsync;