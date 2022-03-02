const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { User, Session } = require('../models/index')
const { SECRET } = require('../utils/config')

router.post('/', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  })

  if (!(user && req.body.password === 'secret')){
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)
  await Session.create({userId: user.id, token: token})

  res
    .status(200)
    .send({ token, username: user.username, name: user.name
    })
})

module.exports = router