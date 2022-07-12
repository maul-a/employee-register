import { Router } from 'express'
import { Types } from 'mongoose'
import { celebrate, Segments, Joi } from 'celebrate'
import { getUser } from '@app/middlewares/user'
import Comment from '@app/models/Comment'
import { jwtGuard } from '@app/services/jwt-service'

const router = Router()


router.get('/',
  jwtGuard,
  getUser,
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      userId: Joi.string().required(),
    }),
  }),
  async (req, res) => {
    const { userId } = req.query
    const comments = await Comment.find({
      employee: new Types.ObjectId(userId!.toString())
    })
    return res.json({
      data: {
        comments: comments.map(comment => ({
          id: comment._id,
          employee: comment.employee,
          text: comment.text,
        })),
      }
    })
  }
)

router.post('/',
  jwtGuard,
  getUser,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      text: Joi.string().required(),
    }),
  }),
  async (req, res) => {
    const employee = req.user!.user
    const comment = new Comment({
      text: req.body.text,
      employee: employee._id,
      date: new Date(),
    })
    await comment.save()
    return res.json({ data: { comment } })
  }
)

export default router