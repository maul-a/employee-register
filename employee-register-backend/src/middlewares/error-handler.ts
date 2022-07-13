import { ErrorRequestHandler } from 'express'


export const internalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError')  {
    return res.status(403).send({
      error_code: 403,
      error_status: 'Access denied',
    })
  }
  next(err)
}