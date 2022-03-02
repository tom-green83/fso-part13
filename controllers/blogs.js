const { Op } = require('sequelize')
const router = require('express').Router()
const { Blog, User, Readinglist } = require('../models/index')
const { tokenExtractor, sessionValidator } = require('../utils/middleware')


router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [
        { title : { [Op.iLike]: req.query.search }},
        { author : { [Op.iLike]: req.query.search }}
      ]
    }
  }

  const blogs = await Blog.findAll({
    include: {
      model: User
    },
    where,
    order: [
      ['likes', 'DESC']
    ]
  })
  res.json(blogs)
})

router.post('/', sessionValidator, tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create( {...req.body, userId: user.id })
  res.json(blog)
})

router.delete('/:id', sessionValidator, tokenExtractor, async (req, res) => {
  console.log('delete endpoint')
  const blog = await Blog.findByPk(req.params.id)
  if (blog.userId === req.decodedToken.id) {
    const readinglist = await Readinglist.findOne({
      where: {
        blogId: blog.id
      }
    })
    if (readinglist) {
      res.status(400).send({ error: 'cannot delete blog which exists in readinglist' })

    } else {
      blog.destroy()
      res.status(204).end()
    }

  } else
  {
    res.status(400).send({ error: 'user is not creator of blog' })
  }
})

router.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  blog.likes = req.body.likes
  blog.save()
  res.json(blog)
})

module.exports = router