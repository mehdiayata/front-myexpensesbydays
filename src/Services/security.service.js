import axios from "axios"
import host from "./server.service"

const getToken = (username, password) => {
    return axios.post(host + '/login', {
        username: username,
        password: password
    })
}

const refreshToken = (refreshToken) => {
    axios.post(host + '/token/refresh', {
        refresh_token: refreshToken
    }).then((resp) => {
        localStorage.setItem('JWT', resp.data.token)
    })
}

const registration = (email, password) => {
    return axios.post(host + '/registration', {
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

                    // Si les TokenRefresh est invalid redirige vers login
                    if (err.response.data.message === "JWT Refresh Token Not Found") {
                        localStorage.clear()
                        window.location.href = "/login";
                    }

                    try {
                        const rs = await axios.post(host + "/token/refresh", {
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
    return axios.put(host + '/users/' + idUser, {
        password: newPassword
    },
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('JWT') //the token is a variable which holds the token
            }
        })
}

const editFirstUse = (idUser, firstUse) => {
    return axios.put(host + '/users/' + idUser, {
        firstUse: firstUse
    },
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('JWT') //the token is a variable which holds the token
            }
        })
}


const checkEmail = (email, key) => {
    return axios.post(host + '/checkAccount', {
        email: email,
        verifyEmail: key
    })
}

const forgotPassword = (email) => {
    return axios.post(host + '/forgotPassword', {
        email: email
    })
}

const resetPassword = (email, newPassword, resetPasswordKey) => {
    return axios.post(host + '/resetPassword', {
        email: email,
        password: newPassword,
        resetPassword: resetPasswordKey
    })
}

const deleteAccount = (idUser) => {
    return axios.delete(host + '/users/' + idUser, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('JWT')
        }
    });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getToken,
    refreshToken,
    registration,
    refreshTokenResponse,
    refreshTokenRequest,
    editPassword,
    checkEmail,
    forgotPassword,
    resetPassword,
    deleteAccount,
    editFirstUse
}