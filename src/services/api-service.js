import axios from "axios";

const baseURL = 'https://cloud-api.yandex.net/v1';
const token = localStorage.getItem('access_token')

const config = {
    headers: {
        Accept: 'application/json',
        Authorization: `OAuth ${token}`
    }
}

export const getDiskInfo = async () => {
    const response = await axios.get(`${baseURL}/disk/`, config)
    return response.data
};

export const loadFile = async (file) => {
    if (!file) {
        return console.log('incorrect data')
    }
    const fileName = encodeURIComponent(file.name)
    const responseObj = await axios.get(`${baseURL}/disk/resources/upload?path=${fileName}`, config)

    const url = responseObj.data?.href

    if (!url) {
        console.log('yandex api не вернул url')
        return
    }
    await axios.put(`${url}`, file, {
        headers: {
            'content-type': file.type,
            'content-length': `${file.size}`,
        },
    })

};

export const uploadAll = async (files) => {

    if (!files) {
        return console.log('Отсутствуют файлы для загрузки')
    }
    console.log('filse', files)
    // Promise.all(files.map(d =>
    //     fetch(`${baseURL}/disk/resources/upload?path=${encodeURIComponent(d.name)}`, {
    //         headers: {
    //             Accept: 'application/json',
    //             Authorization: `OAuth ${token}`
    //         }
    //     }
    //     )))
    //     .then(responses => Promise.all(responses.map(r => r.json())))
    //     .then(result => console.log('result', result))
    //     .then(result => {})
    //     .catch(error => console.log('promise', error))
    try {
        const responsesUrl = await Promise.all(files.map(f =>
            fetch(`${baseURL}/disk/resources/upload?path=${encodeURIComponent(f.name)}`, {
                headers: {
                    Accept: '*/*',
                   
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
        console.log('finalERrr', error)
    }

}

//