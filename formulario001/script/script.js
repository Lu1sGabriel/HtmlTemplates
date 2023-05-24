// Obtém o elemento do formulário pelo ID
const form = document.getElementById('form');

// Obtém os campos de entrada requeridos
const campos = document.querySelectorAll('.inputs.required');

// Obtém as mensagens de erro para os campos requeridos
const spansRequired = document.querySelectorAll('.spanRequired');

// Obtém as mensagens de validação para os campos
const validatedSpans = document.querySelectorAll('.validInput');

// Expressão regular para validar endereços de email
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Obtém o botão de envio do formulário
const submitButton = document.querySelector('button[type="submit"]');

// Adiciona um ouvinte de evento para o evento "submit" do formulário
form.addEventListener('submit', (event) => {
    event.preventDefault();
    validateForm();
});

// Adiciona um ouvinte de evento para cada campo de entrada
campos.forEach((campo) => {
    campo.addEventListener('input', () => {
        validateField(campo);
        updateSubmitButton();
    });
});

// Define o estilo de erro para um campo
function setError(index) {
    const campo = campos[index];
    campo.style.border = '3px solid #e63636';
    spansRequired[index].style.display = 'block';
    validatedSpans[index].style.display = 'none';
}

// Remove o estilo de erro para um campo
function removeError(index) {
    const campo = campos[index];
    campo.style.border = '3px solid #008000';
    spansRequired[index].style.display = 'none';
    validatedSpans[index].style.display = 'block';
}

// Validação do campo de nome
function nameValidate() {
    const campo = campos[0];
    if (campo.value.length < 3) {
        setError(0);
        return false;
    } else {
        removeError(0);
        return true;
    }
}

// Validação do campo de email
function emailValidate() {
    const campo = campos[1];
    if (!emailRegex.test(campo.value)) {
        setError(1);
        return false;
    } else {
        removeError(1);
        return true;
    }
}

// Validação do campo de senha principal
function mainPasswordValidate() {
    const campo = campos[2];
    if (campo.value.length < 8) {
        setError(2);
        return false;
    } else {
        removeError(2);
        return true;
    }
}

// Validação do campo de comparação de senha
function comparePassword() {
    const campo1 = campos[2];
    const campo2 = campos[3];
    if (campo1.value === campo2.value && campo2.value.length >= 8) {
        removeError(3);
        return true;
    } else {
        setError(3);
        return false;
    }
}

// Valida um campo específico com base no campo fornecido
function validateField(field) {
    switch (field) {
        case campos[0]:
            return nameValidate();
        case campos[1]:
            return emailValidate();
        case campos[2]:
            return mainPasswordValidate();
        case campos[3]:
            return comparePassword();
        default:
            return false;
    }
}

// Valida o formulário como um todo
function validateForm() {
    const isNameValid = nameValidate();
    const isEmailValid = emailValidate();
    const isPasswordValid = mainPasswordValidate();
    const isPasswordMatch = comparePassword();

    if (isNameValid && isEmailValid && isPasswordValid && isPasswordMatch) {
        console.log('Formulário válido! Enviando...');
        form.submit();
    } else {
        console.log('Formulário inválido! Corrija os erros.');
    }
}

// Atualiza o estado do botão de envio
function updateSubmitButton() {
    const isValid = Array.from(campos).every((campo) => validateField(campo));
    submitButton.disabled = !isValid;
}
