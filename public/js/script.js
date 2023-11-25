
const nameP = document.getElementById('name')
const description = document.getElementById('description')
const email = document.getElementById('email')
const consultationFee = document.getElementById('consult-value')
const phoneNumber = document.getElementById('n-phone')
const address = document.getElementById('dir')
const modality = document.getElementById('select')
const nameError = document.getElementById('name-error')
const emailError = document.getElementById('email-error')

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.card-body')

    container.addEventListener('click', (event) => {
        const clickBtn = event.target

        if (clickBtn.classList.contains('edit-btn') || clickBtn.classList.contains('del-btn')) {
            const psychologistId = clickBtn.dataset.id;

            if (psychologistId) {
                if (clickBtn.classList.contains('edit-btn')) {
                    console.log('Editar psicólogo con ID: ' + psychologistId)
                } else if (clickBtn.classList.contains('del-btn')) {
                    console.log('Eliminar psicólogo con ID: ' + psychologistId)

                    Swal.fire({
                        title: 'Estas seguro que quieres eliminar el afiliado?',
                        showDenyButton: true,
                        reverseButtons: true,
                        confirmButtonText: 'Eliminar',
                        denyButtonText: `Cancelar`,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deletePsychologist(psychologistId)
                        }
                      })
                }
            } else {
                console.error('ID no encontrado');
            }
        }
    })
});

function deletePsychologist(id) {
    fetch(`http://localhost:3800/consult/${id}`, {
        method: 'DELETE'
    })
    .then((res) => {
        if(res.status === 200) {
            Swal.fire('Eliminado!', '', 'success')
            window.location.href = 'http://localhost:3800/consult'
        } else {
            Swal.fire('Error, no es posible eliminar', '', 'error')
        }
    })
    .catch(error => {
        console.error("Error: ", error)
    })
}

const addBtn = document.getElementById('add-btn')
addBtn.addEventListener('click', () =>{
    nameError.textContent = ''

    if (!nameP.value) {
        nameError.textContent = 'Por favor, asegurate de ingresar un nombre.'
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value) ) {
        emailError.textContent = 'Por favor, ingresa una dirección de correo electrónico válida.';
        return;
    }

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
    .catch(error => {
        console.error("Error: ", error)
    })
});
