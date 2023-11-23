
const data = require('../public/data/psychologists.json')

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

module.exports=(
   getAll (req, res) {
        const psychologists=getPsychologists();
        res.render('consultTable', {'title': 'Gestión Psicologo/as','psychologists': psychologists})
    }
)