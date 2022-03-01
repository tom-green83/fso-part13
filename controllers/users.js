const router = require('express').Router()
const { Blog, User, Readinglist } = require('../models/index')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username
    }
  })
  user.username = req.body.username
  user.save()
  res.json(user)
})

router.get('/:id', async (req, res) => {
  const where = {}
  if (req.query.read) {
    where.read = req.query.read === 'true'
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['id', 'createdAt', 'updatedAt']},
    include: [
      {
        model: Readinglist,
        attributes: { exclude: ['blogId', 'userId']},
        where,
        include: {
          model: Blog,
          attributes: { exclude: ['userId', 'createdAt', 'updatedAt']}
        }
      }
    ]
  })

  const readings = user.readinglists.map(readinglist => {
    const reading = readinglist.blog.dataValues
    reading.readinglists = [{id: readinglist.id, read: readinglist.read }]
    return reading
  })

  const formattedUser = {
    name: user.name,
    username: user.username,
    readings: readings
  }

  res.json(formattedUser)
})

module.exports = router