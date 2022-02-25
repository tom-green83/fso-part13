const router = require('express').Router()
const sequelize = require('sequelize')
const { Blog } = require('../models/index')


router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('title')), 'blogs'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ],
    group: [
      'author'
    ],
    order: sequelize.literal('likes DESC')
  })
  res.json(blogs)
})

module.exports = router