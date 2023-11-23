const express = require('express')
const router = express.Router()
const {getAll}=require('../controllers/psychologistsController')

console.log(psychologists)
router.get("/", getAll)

module.exports = router