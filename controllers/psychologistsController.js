const fs = require('fs')
const path = require('path')
const dataPath = path.join(__dirname, '../public/data/psychologists.json')
const data = require('../public/data/psychologists.json')
const { v4: uuidv4 } = require('uuid');

const getPsychologists=()=>{
   return data.psychologists.map(psy => {
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


}

module.exports={
   getAll (req, res) {
        const psychologists=getPsychologists();
        res.render('consultTable', {'title': 'Gestión Psicologo/as','psychologists': psychologists})
    },
    create (req, res) {
        const dataRegister = req.body;
        dataRegister.id = uuidv4();
        console.log(data)
        data.psychologists.push(dataRegister)
        const dataSave = JSON.stringify(data, null, 2)
        fs.writeFileSync(dataPath, dataSave)
        res.status(200).send('ok')
    }
}