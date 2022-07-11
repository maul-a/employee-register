import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import md5 from 'md5'
import Employee from '@app/models/Employee'
import User from '@app/models/User'
import JWTService from '@app/services/jwt-service'

const router = Router()

router.post('/', 
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required().min(6),
    }),
  }),
  async (req, res) => {
    interface IBody {
      username: string
      password: string
    }
    const { username, password }: IBody = req.body
    const employee = await Employee.findOne({
      'authData.username': username
    })
    if (!employee) {
      return res.status(400).json({
        status_code: 400,
        status_message: 'There is no such username! / pasword combination'
      })
    }
    const hash = md5(employee.authData.salt + password)
    if (hash !== employee.authData.hash) {
      return res.status(400).json({
        status_code: 400,
        status_message: 'There is no such username / pasword combination'
      })
    }

    const jwtService = new JWTService()
    const jwtToken = jwtService.signJWT(employee._id)
    return res.status(200).json({
      data: {
        user: {
          id: employee._id,
          username: employee.authData.username,
          email: employee.authData.email,
          personalData: employee,
        },
        jwtToken
      }
    })
  })


export default router