"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boomErrorHandlr = exports.ErrorHandler = exports.logErrors = void 0;
const logErrors = (err, req, res, next) => {
    console.error(err);
    next(err);
};
exports.logErrors = logErrors;
const ErrorHandler = (err, req, res, next) => {
    res.status(500).json({
        message: err.message
    });
};
exports.ErrorHandler = ErrorHandler;
const boomErrorHandlr = (err, req, res, next) => {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    else {
        next(err);
    }
};
exports.boomErrorHandlr = boomErrorHandlr;
