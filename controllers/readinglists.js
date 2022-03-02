const router = require('express').Router()
const { Readinglist } = require('../models/index')
const { tokenExtractor, sessionValidator } = require('../utils/middleware')

router.post('/', async (req, res) => {
  const readingList = await Readinglist.create({...req.body})
  console.log(readingList)
  res.json(readingList)
})

router.put('/:id', sessionValidator, tokenExtractor, async (req, res) => {
  const readingList = await Readinglist.findByPk(req.params.id)

  if (!(req.decodedToken.id === readingList.userId)) {
    res.status(400).send({ error: 'user is not creator of readinglist' })
  }

  readingList.read = req.body.read
  await readingList.save()
  res.json(readingList)
})


module.exports = router