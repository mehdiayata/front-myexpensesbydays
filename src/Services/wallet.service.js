import axios from 'axios';
import host from "./server.service"

const getWallets = () => {

    return axios.get(host + '/wallets/', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('JWT')
        }

    })
};


const getWallet = (idWallet) => {

    return axios.get(host + '/wallets/'+idWallet, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('JWT')
        }

    })
};


const getMainWallet = () => {
    return axios.get(host + '/wallets/main', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('JWT')
        }
    })
}

const getWalletTransactions = (idCurrentWallet) => {
    return axios.get(host + '/wallets/' + idCurrentWallet + '/transactions', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('JWT')
        }
    })
}


const postWallet = (amount) => {

    return axios.post(host + '/wallets', {
        amount: amount,
        createdAt: new Date().toJSON()
    }, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('JWT')
        },

    })
}

const putMainWallet = (idCurrentWallet) => {
    return axios.put(host + '/wallets/'+idCurrentWallet+'/main', {

    }, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('JWT')
        },
    })
}

const putWallet = (idWallet, amount) => {
    return axios.put(host + '/wallets/'+idWallet, {
        amount: amount,
        editAt: new Date().toJSON()
    }, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('JWT')
        },
    })
}

const deleteWallet = (idWallet) => {
    return axios.delete(host + '/wallets/'+idWallet, {}, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('JWT')
        },
    })
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getWallets,
    getWallet,
    getMainWallet,
    getWalletTransactions,
    postWallet,
    putMainWallet,
    putWallet,
    deleteWallet
};

