export default function openModal(value = null) {
  const modal = document.getElementById("modal")
  const closeModalButton = document.getElementById("closeModalButton")
  const body = document.body
  const scrollBarWith = getScrollbarWidth()
  const valueModal = document.getElementById("valueModal")

  if (!modal || !closeModalButton) {
    console.error("Modal or Close Button not found")
    return
  }

  if (value !== null) {
    const textNode = document.createTextNode(value)
    valueModal.appendChild(textNode)
  }

  modal.style.display = "flex"
  document.body.classList.add("no-scroll")

  body.style.paddingRight = `${scrollBarWith}px`

  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none"
    document.body.classList.remove("no-scroll")

    body.style.paddingRight = ""
  })

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none"
      document.body.classList.remove("no-scroll")

      body.style.paddingRight = ""
    }
  })
}

function getScrollbarWidth() {
  let div = document.createElement("div")

  div.style.overflowY = "scroll"
  div.style.width = "50px"
  div.style.height = "50px"

  document.body.append(div)
  let scrollWidth = div.offsetWidth - div.clientWidth

  div.remove()

  return scrollWidth
}
