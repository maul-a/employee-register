import { Router } from 'express'
import userRouter from './user'

const router = Router()

router.use('/user', userRouter)

router.get('/health', async (req, res) => {
  return res.status(200).send('ok')
})

export default router