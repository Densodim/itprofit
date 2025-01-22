export default function validateStyle(element) {
  element.style.border = `1px solid ${element.value === "" ? "hsl(0, 66%, 56%)" : "hsl(186, 15%, 59%)"}`
  element.nextElementSibling.style.visibility =
    element.value === "" ? "visible" : "hidden"
}
