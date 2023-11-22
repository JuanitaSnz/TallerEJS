const express = require('express')
const router = express.Router()

const data = require('../public/data/psychologists.json')

const psychologists = data.psychologists.map(psy => {
    return {
        id: psy.id,
        name: psy.name,
        description: psy.description,
        modality: psy.modality,
        consultationFee: psy.consultationFee,
        email: psy.email,
        phoneNumber: psy.phoneNumber,
        address: psy.address
    }
})

console.log(psychologists)
router.get("/", (req, res) => {
    res.render('consultTable', {'title': 'Gestión Psicologo/as','psychologists': psychologists})
})

module.exports = router