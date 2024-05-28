import mongoose from "mongoose";
import BaseError from "../errors/BaseError.js";
import IncorrectRequest from "../errors/IncorrectRequest.js";
import ValidationError from "../errors/ValidationError.js";
import NotFound from "../errors/NotFound.js";

function errorHandler (error, req, res, next) {       
    if(error instanceof mongoose.Error.CastError) {
        new IncorrectRequest().sendResponse(res);
    } else if (error instanceof mongoose.Error.ValidationError) {
        new ValidationError(error).sendResponse(res);
    } else if (error instanceof NotFound) {
        error.sendResponse(res);
    } else {
        new BaseError().sendResponse(res);
    };
}

export default errorHandler;