import { Router } from 'express'
import employeeRouter from './employee'
import commentsRouter from './comment'

const router = Router()

router.use('/employee', employeeRouter)
router.use('/comment', commentsRouter)

router.get('/health', async (req, res) => {
  return res.status(200).send('ok')
})

export default router