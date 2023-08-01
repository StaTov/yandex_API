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

export const loadFile = async () => {
    const url = await axios.get(`${baseURL}/disk/resources/upload?path=`, )
};

//