const express = require('express')
const router = express.Router()
const {getAll, create}=require('../controllers/psychologistsController')

router.get("/", getAll)

router.post("/register", create)

module.exports = router