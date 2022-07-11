import { Router } from 'express'
import crypto from 'crypto'
import md5 from 'md5'
import { celebrate, Segments, Joi } from 'celebrate'

import authRouter from '@app/routers/user/token'
import User from '@app/models/User'
import { IEmployee } from '@app/models/Employee'
import { getUser } from '@app/middlewares/user'
import { jwtGuard } from '@app/services/jwt-service'

const router = Router()

router.get('/', 
  jwtGuard,
  getUser,
  async (req, res) => {
    try {
      const users = await User.find({})
      return res.json({
        data: {
          users: users.map(user => ({
            id: user._id,
            personalData: user.personalData,
          }))
        }
      }) 
    } catch (err) {
      return res.status(500).json({
        error_code: 500,
        error_message: 'Server Internal Error',
      })
    }
  })

router.post('/', 
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required().min(6),
      personalData: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        role: Joi.string().required(),
        address: Joi.object().keys({
          street: Joi.string().required(),
          streetNr: Joi.string().required(),
          ZIP: Joi.string().required(),
          place: Joi.string().required(),
          country: Joi.string().required(),
        }).required(),
      }).required(),
    }),
  }),
  async (req, res) => {
    interface IBody {
      username: string
      email: string
      password: string
      personalData: IEmployee
    }
    try {
      const salt = crypto.randomBytes(16).toString('base64')
      const { 
        username, 
        email, 
        password, 
        personalData,
      }: IBody = req.body
      const hash = md5(salt + password)

      const user = new User({
        username,
        email,
        personalData,
        salt,
        hash,
      })
      const createdUser = await user.save()
      return res.status(200).json({
        data: {
          user: {
            id: createdUser._id,
            username,
            email,
            personalData,
          }
        }
      })
    } catch (err) {
      console.error(err)
      return res.status(500).json({
        error_code: 500,
        error_message: 'Server Internal Error',
      })
    }
  })

router.use('/token', authRouter)


export default router