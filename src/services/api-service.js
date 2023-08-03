import axios from "axios";

const baseURL = 'https://cloud-api.yandex.net/v1';


export const getDiskInfo = async () => {
    const token = localStorage.getItem('access_token')
    if (!token) {
        return console.log('missing token')
    }
    const response = await axios.get(`${baseURL}/disk/`, {
        headers: {
            Accept: 'application/json',
            Authorization: `OAuth ${token}`
        }
    })
    return response.data
};

export const uploadAll = async (files) => {

    if (!files) {
        return console.log('Отсутствуют файлы для загрузки')
    }
    try {
        const token = localStorage.getItem('access_token')
        if (!token) {
            return console.log('missing token')
        }
        const responsesUrl = await Promise.all(files.map(f =>
            fetch(`${baseURL}/disk/resources/upload?path=${encodeURIComponent(f.name)}`, {
                headers: {
                    Accept: '*/*',
                    Authorization: `OAuth ${token}`
                }
            }
            )))
        const result = await Promise.all(responsesUrl.map(r => r.json()))
        const existFiles = result.filter(f => f.message)

        if (existFiles.length > 0) {
            return existFiles
        }

        const responsesFiles = await Promise.all(files.map((f, i) =>
            fetch(`${result[i].href}`, {
                method: 'PUT',
                headers: {
                    'Accept': '*/*',
                    'content-type': f.type,
                    'content-length': `${f.size}`,
                },
                body: f,

            })))
        const response = await Promise.all(responsesFiles.map(f => f.json));
        console.log(response)

    } catch (error) {
        console.log('ошибка', error)
    }

}

//