import { Router } from 'express'
import { Types } from 'mongoose'
import { celebrate, Segments, Joi } from 'celebrate'
import { getUser } from '@app/middlewares/user'
import Comment from '@app/models/Comment'
import { jwtGuard } from '@app/services/jwt-service'
import Employee from '@app/models/Employee'

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
    }).populate('author')
    return res.json({
      data: {
        comments: comments.map(comment => ({
          id: comment._id,
          date: comment.date,
          author: {
            id: comment.author._id,
            firstName: comment.author.firstName,
            lastName: comment.author.lastName,
            role: comment.author.role,
            address: comment.author.address,
          },
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
      userId: Joi.string().required(),
    }),
  }),
  async (req, res) => {
    const author = req.user!.user
    const employee = await Employee.findById(req.body.userId)
    if (!employee) {
      return res.status(404).json({
        error_code: 404,
        error_message: 'Employee not found',
      })
    }
    const comment = new Comment({
      text: req.body.text,
      author: new Types.ObjectId(author._id),
      employee: new Types.ObjectId(employee._id),
      date: new Date(),
    })
    const { _id } = await comment.save()
    const createdComment = await Comment.findById(_id).populate('author')
    return res.json({ data: { comment: createdComment } })
  }
)

export default router