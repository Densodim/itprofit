import validateStyle from "./validateStyle"

export default function validateForm(item) {
  let consent = document.querySelector("[type='checkbox']")
  let isFormValid = true

  for (let i = 0; i < item.length; i++) {
    const isValid = validateStyle(item[i])
    if (!isValid) {
      isFormValid = true
    }
  }
  if (!consent.checked) {
    consent.nextElementSibling.style.visibility = "visible"
    isFormValid = false
  } else {
    consent.nextElementSibling.style.visibility = "hidden"
  }

  return isFormValid
}
