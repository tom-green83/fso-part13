const router = require('express').Router()
const { Readinglist } = require('../models/index')

router.post('/', async (req, res) => {
  // const readingList = await Readinglist.findAll()
  const readingList = await Readinglist.create({...req.body})
  console.log(readingList)
  res.json(readingList)
})

module.exports = router