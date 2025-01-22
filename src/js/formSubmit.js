export default async function formSubmit(form, url) {
  const formData = new FormData(form)

  // Преобразуем FormData в объект
  const jsonData = {}
  formData.forEach((value, key) => {
    jsonData[key] = value
  })
  console.log(formData)

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })

    // console.log('response:',response);
    const result = await response.json()
    if (response.ok) {
      console.log("Result response:", result)

      if (result.status === "success") {
        console.log(result.msg)
        return { success: true, message: result.msg }
      } else {
        throw new Error("Неизвестный формат ответа от сервера")
      }
    } else {
      // Ошибки валидации
      console.log("Error validated email:", result.fields)
      return { success: false, fields: result.fields }
    }
  } catch (err) {
    console.error("Ошибка отправки формы:", err)
    return { success: false, message: err.message }
  }
}
