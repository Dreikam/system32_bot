import type { Request, Response, NextFunction } from 'express'

export const logErrors = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(err);
    next(err)
}
export const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    res.status(500).json({
        message: err.message
    })
}
export const boomErrorHandlr = (err: any, req: Request, res: Response, next: NextFunction): void => {
    if (err.isBoom) {
        const { output } = err
        res.status(output.statusCode).json(output.payload)
    } else {
        next(err)
    }
}