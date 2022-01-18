import axios from 'axios';

const getWallets = () => {

    return axios.get('http://127.0.0.1:8000/api/wallets/', {

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


export default {
    getWallets,
    getMainWallet,
    getWalletTransactions
};

