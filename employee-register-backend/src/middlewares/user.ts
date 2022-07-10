import express from 'express'
import User from '@app/models/User'

export async function getUser(req:express.Request, res:express.Response, next:express.NextFunction) {
  const { userId } = req.user!
  const user = await User.findOne({
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