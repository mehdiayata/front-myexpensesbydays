import axios from "axios"

const getToken = (username, password) => {
    return axios.post('http://127.0.0.1:8000/api/login', {
        username: username,
        password: password
    })
}

const refreshToken = (refreshToken) => {
    axios.post('http://127.0.0.1:8000/api/token/refresh', {
        refresh_token: refreshToken
    }).then((resp) => {
        localStorage.setItem('JWT', resp.data.token)
    })
}

export default {
    getToken,
    refreshToken
}