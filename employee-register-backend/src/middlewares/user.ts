import express from 'express'
import Employee from '@app/models/Employee'

export async function getUser(req:express.Request, res:express.Response, next:express.NextFunction) {
  const { userId } = req.user!
  const user = await Employee.findOne({
    _id: userId,
  })
  if (!user) {
    return res.status(403).json({
      error_code: 403,
      error_message: 'You don\'t have an account',
    })
  }
  req.user!.user = user
  next()
}