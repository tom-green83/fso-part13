const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { Session } = require('../models/index')


const errorHandler = (error, request, response, next) => {
  if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({ error: error.errors[0].message})
  }
  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    res.status(401).json({ error: 'token missing' })
  }
  next()}

const sessionValidator = async (req, res, next) => {
  const token = req.get('authorization').substring(7)

  const session = await Session.findOne({
    where: {
      token
    }
  })

  if (!session) {
    res.status(401).json({ error: 'session invalid' })
  } else {
    next()
  }
}

module.exports = {
  errorHandler, tokenExtractor, sessionValidator
}