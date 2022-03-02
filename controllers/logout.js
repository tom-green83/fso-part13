const router = require('express').Router()

const { Session } = require('../models/index')
const { tokenExtractor, sessionValidator } = require('../utils/middleware')

router.delete('/', sessionValidator, tokenExtractor, async (req, res) => {
  const token = req.get('authorization').substring(7)

  const currentSession = await Session.findOne({
    where: {
      token
    }
  })

  await currentSession.destroy()
  res.status(204).end()
})

module.exports = router