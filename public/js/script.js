const addBtn = document.getElementById('add-btn')
const nameP = document.getElementById('name')
const description = document.getElementById('description')
const email = document.getElementById('email')
const consultationFee = document.getElementById('consult-value')
const phoneNumber = document.getElementById('n-phone')
const address = document.getElementById('dir')
const modality = document.getElementById('select')

addBtn.addEventListener('click', () =>{

    const data = {
        id: "",
        name: nameP.value,
        description: description.value,
        modality: modality.value == 1 ? "Presencial": "Virtual",
        consultationFee: consultationFee.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        address: address.value,
    }

    fetch('http://localhost:3800/consult/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then((res) => {
        console.log(res)
        if (res.status == 200) {
            window.location.href = 'http://localhost:3800/consult'
        }
    })
    .catch()
})