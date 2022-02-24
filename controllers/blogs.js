const router = require('express').Router()
const { Blog } = require('../models/index')

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll()
    res.json(blogs)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    res.json(blog)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const blogToDelete = await Blog.findByPk(req.params.id)
    blogToDelete.destroy()
    res.status(204).end()
  } catch (error) {
    return res.status(400).json({ error })
  }
})

module.exports = router