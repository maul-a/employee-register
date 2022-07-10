import { Router } from 'express'


const router = Router()

router.get('/health', async (req, res) => {
  return res.status(200).send('ok')
})

export default router