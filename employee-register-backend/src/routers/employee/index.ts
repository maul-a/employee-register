import { Router } from 'express'
import crypto from 'crypto'
import md5 from 'md5'
import { celebrate, Segments, Joi } from 'celebrate'
import fs from 'fs'

import CSVService from '@app/services/csv-service'
import tokenRouter from '@app/routers/employee/token'
import Employee, { IEmployee } from '@app/models/Employee'
import { getUser } from '@app/middlewares/user'
import { jwtGuard } from '@app/services/jwt-service'
import { upload } from '@app/middlewares/multer'
import FormatService from '@app/services/format-service'

const router = Router()
const csvService = new CSVService()
const formatService = new FormatService()

router.get('/', 
  jwtGuard,
  getUser,
  async (req, res) => {
    try {
      const employees = await Employee.find({})
      return res.json({
        data: {
          users: employees.map(user => ({
            id: user._id,
            role: user.role,
            address: user.address,
            firstName: user.firstName,
            lastName: user.lastName,
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
router.get('/me',
  jwtGuard,
  getUser,
  async (req, res) => {
    return res.json({ employee: req.user!.user })
  }
)

router.post('/', 
  jwtGuard,
  getUser,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      employee: Joi.object().keys({
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
      employee: IEmployee
    }
    const { employee: employeeData }: IBody = req.body
    const employee = new Employee(employeeData)
    const createdEmployee = await employee.save()
    return res.status(200).json({
      data: {
        employee: {
          ...employeeData,
          id: createdEmployee._id,
        },
      },
    })
  }
)
router.post('/me', 
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
      const employee = new Employee({
        firstName: personalData.firstName,
        lastName: personalData.lastName,
        authData: {
          username,
          email,
          salt,
          hash,
        },
        address: personalData.address,
        role: personalData.role,
      })
      const createdUser = await employee.save()
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

router.post('/import/csv', 
  upload.single('file'),
  async (req, res) => {
    const file = req.file
    if (!file) {
      return res.status(500).json({
        error_code: 500,
        error_message: 'Internal Server Error',
      })
    }
    const buf = fs.readFileSync(file.path)
    const data = await csvService.parseCSV(buf) as any[]
    const formattedCSV = csvService.formatCSV(data)
    const employeesToInsert = formattedCSV.map(row => ({
      firstName: row.Vorname,
      lastName: row.Nachname,
      role: row.Rolle,
      address: {
        country: formatService.getCountryCode(row.Land) ?? row.Land ,
        place: row.Ort,
        ZIP: row.PLZ,
        street: row.Strasse,
        streetNr: row.Nr,
      }
    }))
    const employees = await Employee.insertMany(employeesToInsert)
    return res.json({
      data: { 
        employees: employees.map(employee => ({
          id: employee._id,
          role: employee.role,
          address: employee.address,
          firstName: employee.firstName,
          lastName: employee.lastName,
        }))
      },
    })
  }
)



router.use('/token', tokenRouter)


export default router