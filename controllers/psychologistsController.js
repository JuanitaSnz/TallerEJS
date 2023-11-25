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
    },
    findById: (req, res) => {
        const {id} = req.params
        const psychologist = data.psychologists.find(psy => psy.id === id)

        if (psychologist) {
            res.render('psychologistDetail', {psychologist: psychologist})
        } else {
            res.status(404).send('Psicologo no encontrado')
        }
    },
    update: (req, res) => {
        const {id} = req.params
        const newData = req.body
        const index = data.psychologists.findIndex(psy => psy.id === id)

        if (index !== -1) {
            data.psychologists[index] = {
                id, 
                name: newData.name || data.psychologists[index].name,
                description: newData.description || data.psychologists[index].description,
                modality: newData.modality || data.psychologists[index].modality,
                consultationFee: newData.consultationFee || data.psychologists[index].consultationFee,
                email: newData.email || data.psychologists[index].email,
                phoneNumber: newData.phoneNumber || data.psychologists[index].phoneNumber,
                address: newData.address || data.psychologists[index].address
            }

            const dataSave = JSON.stringify(data, null, 2)
            fs.writeFileSync(dataPath, dataSave)
            res.status(200).send('Psicólogo actualizado correctamente')
        } else {
            res.status(404).send('Psicólogo no encontrado');
        }
        
    },
    deleteById: (req, res) => {
        const {id} = req.params
        const index = data.psychologists.findIndex(psy => psy.id === id)

        if (index !== -1) {
            data.psychologists.splice(index, 1)
            const dataSave = JSON.stringify(data, null, 2)
            fs.writeFileSync(dataPath, dataSave)
            res.status(200).send('Psicologo eliminado correctamente')
        } else {
            res.status(404).send('Psicologo no encontrado')
        }
    }
}