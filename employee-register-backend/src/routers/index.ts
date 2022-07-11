import { Router } from 'express'
import employeeRouter from './employee'

const router = Router()

router.use('/employee', employeeRouter)

router.get('/health', async (req, res) => {
  return res.status(200).send('ok')
})

export default router