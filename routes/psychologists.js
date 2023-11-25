const express = require('express')
const router = express.Router()
const {getAll, create, update, deleteById}=require('../controllers/psychologistsController')

router.get("/", getAll)
router.post("/register", create)
router.put("/:id", update)
router.delete("/:id", deleteById)

module.exports = router