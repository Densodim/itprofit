import "../scss/main.scss"
import IMask from "imask"
import formSubmit from "./formSubmit"
import openModal from "./modal"
import validateStyle from "./validateStyle"
import validateForm from "./validateForm"

document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.getElementById("phone")
  const modalWindows = document.getElementById("openModalButton")

  if (phoneInput) {
    IMask(phoneInput, {
      mask: "+{375}(00)000-00-00",
    })
  }

  let firstName = document.getElementById("first-name")
  let email = document.getElementById("email")
  let phone = document.getElementById("phone")
  let message = document.getElementById("message")

  let item = [firstName, email, phone, message]

  document.forms[0].addEventListener("submit", async (e) => {
    e.preventDefault()

    const isFormValid = validateForm(item)
    if (!isFormValid) {
      return
    }

    const form = e.target
    const url = "http://localhost:9000/api/form-submit"

    const result = await formSubmit(form, url)

    if (result.success) {
      openModal(result.message)
      form.reset()
    } else if (result.fields) {
      Object.keys(result.fields).forEach((fieldName) => {
        const field = form.querySelector(`[name="${fieldName}"]`)
        if (field) {
          validateStyle(field)
          const errorMsg = field.nextElementSibling
          if (errorMsg) {
            errorMsg.textContent = result.fields[fieldName]
            errorMsg.style.visibility = "visible"
          }
        }
      })
    } else {
      openModal(result.message)
    }
  })

  modalWindows.addEventListener("click", () => {
    openModal()
  })
})
