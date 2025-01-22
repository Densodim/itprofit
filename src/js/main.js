import "../scss/main.scss"
import IMask from "imask";
import formSubmit from "./formSubmit";

const phoneInput = document.getElementById('phone');

if (phoneInput) {
    IMask(phoneInput, {
        mask: '+{375}(00)000-00-00'
    });
}

let firstName = document.getElementById('first-name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let message = document.getElementById('message');
let consent = document.querySelector("[type='checkbox']");

function validateStyle(element) {
    element.style.border = `1px solid ${element.value === '' ? 'hsl(0, 66%, 56%)' : 'hsl(186, 15%, 59%)'}`;
    element.nextElementSibling.style.visibility = element.value === '' ? 'visible' : 'hidden';
}

let item = [firstName, email, phone, message];

function validateForm(item) {
    let isFormValid = true;


        for (let i = 0; i < item.length; i++) {
            const isValid = validateStyle(item[i]);
            if (!isValid) {
                isFormValid = false;
            }
        }
        if (!consent.checked) {
            consent.nextElementSibling.style.visibility = 'visible';
            isFormValid = false;
        }else {
            consent.nextElementSibling.style.visibility = 'hidden';

        }

    return isFormValid;
}

document.forms[0].addEventListener('submit', async (e) => {
    e.preventDefault()

    const isFormValid = validateForm(item);
    if (!isFormValid) {
        return
    }

    const form = e.target;
    const url = 'http://localhost:9000/api/form-submit'; // Адрес сервера

    const result = await formSubmit(form, url);

    if (result.success) {
        alert(result.message)
        form.reset()
    } else if (result.fields) {
        Object.keys(result.fields).forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`)
            if (field) {
                validateStyle(field);
                const errorMsg = field.nextElementSibling;
                if (errorMsg) {
                    errorMsg.textContent = result.fields[fieldName];
                    errorMsg.style.visibility = 'visible';
                }
            }
        })
    } else {
        alert(result.message)
    }

})








