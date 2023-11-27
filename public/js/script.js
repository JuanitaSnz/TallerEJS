const nameP = document.getElementById('name');
const description = document.getElementById('description');
const email = document.getElementById('email');
const consultationFee = document.getElementById('consult-value');
const phoneNumber = document.getElementById('n-phone');
const address = document.getElementById('dir');
const modality = document.getElementById('select');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const phoneError = document.getElementById('phone-error');
const valueError = document.getElementById('value-error');
const addBtn = document.getElementById('add-btn');

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.card-body');

    container.addEventListener('click', (event) => {
        const clickBtn = event.target;

        if (clickBtn.classList.contains('edit-btn') || clickBtn.classList.contains('del-btn')) {
            const psychologistId = clickBtn.dataset.id;

            if (psychologistId) {
                if (clickBtn.classList.contains('edit-btn')) {
                    console.log('Editar psicólogo con ID: ' + psychologistId);
                    editPsychologist(psychologistId);
                } else if (clickBtn.classList.contains('del-btn')) {
                    console.log('Eliminar psicólogo con ID: ' + psychologistId);

                    Swal.fire({
                        title: 'Estas seguro que quieres eliminar el afiliado?',
                        showDenyButton: true,
                        reverseButtons: true,
                        confirmButtonText: 'Eliminar',
                        denyButtonText: `Cancelar`,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            deletePsychologist(psychologistId);
                        }
                    });
                }
            } else {
                console.error('ID no encontrado');
            }
        }
    });
});

function editPsychologist(id) {
    fetch(`http://localhost:3800/consult/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(psychologist => {
        console.log(psychologist);
        const queryParams = new URLSearchParams(psychologist).toString();
        window.location.href = `http://localhost:3800/register?${queryParams}`;
    })
    .catch(error => {
        console.error("Error: ", error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const psychologistData = {};
    for (const [key, value] of urlParams) {
        psychologistData[key] = value;
    }
    if (Object.keys(psychologistData).length > 0) {
        fillForm(psychologistData);
    }
});

function fillForm(psychologist) {
    if (nameP) nameP.value = psychologist.name || '';
    if (description) description.value = psychologist.description || '';
    if (email) email.value = psychologist.email || '';
    if (consultationFee) consultationFee.value = psychologist.consultationFee || '';
    if (phoneNumber) phoneNumber.value = psychologist.phoneNumber || '';
    if (address) address.value = psychologist.address || '';
    if (modality) modality.value = psychologist.modality === 'Presencial' ? 1 : 2;
    const cardTitle = document.querySelector('.card-header h1'); 
    if (cardTitle) {
        cardTitle.textContent = 'Actualizar Psicólogo';
    }

    addBtn.textContent = 'Actualizar';
    
 
    addBtn.removeEventListener('click', handleAddButtonClick);
    
  
    addBtn.addEventListener('click', () => {
        updatePsychologist(psychologist.id);
    });
}

function updatePsychologist(id) {
    if (validateForm()) {
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const email = document.getElementById('email').value;
        const consultationFee = document.getElementById('consult-value').value;
        const phoneNumber = document.getElementById('n-phone').value;
        const address = document.getElementById('dir').value;
        const modality = document.getElementById('select').value === '1' ? 'Presencial' : 'Virtual';
        const updatedPsychologist = {
            name,
            description,
            email,
            consultationFee,
            phoneNumber,
            address,
            modality
        };
        fetch(`http://localhost:3800/consult/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPsychologist)
        })
        .then(response => response.text())
        .then(result => {
            Swal.fire({
                icon: 'success',
                title: 'Actualización Exitosa',
                showConfirmButton: false,
                timer: 1500 
            });

            setTimeout(() => {
                window.location.href = 'http://localhost:3800/consult';
            }, 2000); 
        })
        .catch(error => console.error("Error:", error));
    }
}

function deletePsychologist(id) {
    fetch(`http://localhost:3800/consult/${id}`, {
        method: 'DELETE'
    })
    .then((res) => {
        if (res.status === 200) {
            Swal.fire('Eliminado!', '', 'success');
            window.location.href = 'http://localhost:3800/consult';
        } else {
            Swal.fire('Error, no es posible eliminar', '', 'error');
        }
    })
    .catch(error => {
        console.error("Error: ", error);
    });
}
function validateForm() {
    nameError.textContent = '';
    emailError.textContent = '';
    phoneError.textContent = '';
    valueError.textContent = '';

    if (
        !nameP.value.trim() ||
        !description.value.trim() ||
        !email.value.trim() ||
        !consultationFee.value.trim() ||
        !phoneNumber.value.trim() ||
        !address.value.trim()
    ) {
        document.getElementById('error-message').style.display = 'block';
        return false;
    } else {
        document.getElementById('error-message').style.display = 'none';
    }

    const namePattern = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/;
    if (!namePattern.test(nameP.value.trim())) {
        nameError.textContent = 'Por favor, asegúrate de ingresar un nombre válido.';
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        emailError.textContent = 'Por favor, ingresa una dirección de correo electrónico válida.';
        return false;
    }

    const numberPattern = /^[0-9]+$/;
    if (!numberPattern.test(phoneNumber.value.trim())) {
        phoneError.textContent = 'Por favor, ingresa un numero de telefono válido';
        return false;
    }

    if (!numberPattern.test(consultationFee.value.trim())) {
        valueError.textContent = 'Por favor, ingresa un valor válido';
        return false;
    }


    return true;
}

function handleAddButtonClick() {
    if (validateForm()) {
        const data = {
            id: "",
            name: nameP.value,
            description: description.value,
            modality: modality.value == 1 ? "Presencial" : "Virtual",
            consultationFee: consultationFee.value,
            email: email.value,
            phoneNumber: phoneNumber.value,
            address: address.value,
        };

        fetch('http://localhost:3800/consult/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then((res) => {
            console.log(res);
            if (res.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro Exitoso',
                    showConfirmButton: false,
                    timer: 1500 
                });

                setTimeout(() => {
                    window.location.href = 'http://localhost:3800/consult';
                }, 2000); 
            }
        })
        .catch(error => {
            console.error("Error: ", error);
        });
    }
}

addBtn.addEventListener('click', handleAddButtonClick);
