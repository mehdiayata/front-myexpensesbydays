import axios from "axios"

const getToken = (username, password) => {
    return axios.post('http://127.0.0.1:8000/api/login', {
        username: username,
        password: password
    })
}

export default {
    getToken
}