const router = require('express').Router()
const { Blog, User } = require('../models/index')
const { tokenExtractor } = require('../utils/middleware')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create( {...req.body, userId: user.id })
  res.json(blog)
})

router.delete('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  blog.destroy()
  res.status(204).end()
})

router.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  blog.likes = req.body.likes
  blog.save()
  res.json(blog)
})

module.exports = router