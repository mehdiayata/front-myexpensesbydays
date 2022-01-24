import axios from 'axios';

const getWallets = () => {

    return axios.get('http://127.0.0.1:8000/api/wallets/', {

        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('JWT')
        }

    })
};


const getWallet = (idWallet) => {

    return axios.get('http://127.0.0.1:8000/api/wallets/'+idWallet, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('JWT')
        }

    })
};


const getMainWallet = () => {
    return axios.get('http://127.0.0.1:8000/api/wallets/main', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('JWT')
        }
    })
}

const getWalletTransactions = (idCurrentWallet) => {
    return axios.get('http://127.0.0.1:8000/api/wallets/' + idCurrentWallet + '/transactions', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('JWT')
        }
    })
}


const postWallet = (amount) => {

    return axios.post('http://127.0.0.1:8000/api/wallets', {
        amount: amount,
        createdAt: new Date().toJSON()
    }, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('JWT')
        },

    })
}

const putMainWallet = (idCurrentWallet) => {
    return axios.put('http://127.0.0.1:8000/api/wallets/'+idCurrentWallet+'/main', {

    }, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('JWT')
        },
    })
}

const putWallet = (idWallet, amount) => {
    return axios.put('http://127.0.0.1:8000/api/wallets/'+idWallet, {
        amount: amount,
        editAt: new Date().toJSON()
    }, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('JWT')
        },
    })
}

const deleteWallet = (idWallet) => {
    return axios.delete('http://127.0.0.1:8000/api/wallets/'+idWallet, {}, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('JWT')
        },
    })
}


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

