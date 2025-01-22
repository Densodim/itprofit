export default async function formSubmit(form, url) {
    const formData = new FormData(form);

    // Преобразуем FormData в объект
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    })
    console.log(formData);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData),
        });

        if (response.ok) {
            const result = await response.json();
            if (result.status === 'success') {
                console.log(result.msg);
                return {success: true, message: result.msg};
            } else if (result.status === 'error') {
                // Ошибки валидации
                console.log('Ошибки валидации:', result.fields);
                return {success: false, fields: result.fields};
            } else {
                throw new Error('Неизвестный формат ответа от сервера');
            }
        } else {
            throw new Error(`Ошибка сервера: ${response.status}`);

        }

    } catch (err) {
        console.error('Ошибка отправки формы:', err);
        return {success: false, message: err.message};
    }
}
