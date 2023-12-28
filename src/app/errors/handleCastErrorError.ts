import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";


const handleCastErrorError = (err: mongoose.Error.CastError): TGenericErrorResponse => {

    const errorSources: TErrorSources = [{
        path: err.path,
        message: err.message,
    }]

    const statusCode = 400;

    return {
        statusCode,
        message: 'Invalid Id',
        errorSources,
    };



}

export default handleCastErrorError;