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

const registration = (email, password) => {
    return axios.post('http://127.0.0.1:8000/api/registration', {
        email: email,
        password: password
    })
}


const refreshTokenRequest = () => {
    return axios.interceptors.request.use(

        (config) => {

            const token = localStorage.getItem('JWT');
            if (token) {
                config.headers["Authorization"] = 'Bearer ' + token;
            }
            return config;
        },
        (error) => {

            console.log(error);
            return Promise.reject(error);
        }
    );
}

const refreshTokenResponse = () => {
    return axios.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {

            const originalConfig = err.config;

            if (originalConfig.url !== "/api/login" && err.response) {

                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        const rs = await axios.post("http://127.0.0.1:8000/api/token/refresh", {
                            refresh_token: localStorage.getItem('refresh_token')
                        });


                        localStorage.setItem('JWT', rs.data.token)

                        return axios(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }

            return Promise.reject(err);
        }
    );
}

const editPassword = (idUser, newPassword) => {
    return axios.put('http://127.0.0.1:8000/api/users/' + idUser, {
        password: newPassword
    },
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('JWT') //the token is a variable which holds the token
            }
        })
}

export default {
    getToken,
    refreshToken,
    registration,
    refreshTokenResponse,
    refreshTokenRequest,
    editPassword
}