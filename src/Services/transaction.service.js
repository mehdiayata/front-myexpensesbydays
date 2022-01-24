import axios from "axios";

const postTransactions = (amount, idCurrentWallet) => {

    amount = amount.toString();
    let date = new Date();
    //console.log(date.toJSON());

    return axios.post('http://127.0.0.1:8000/api/transactions', {
        amount: amount,
        createdAt: date.toJSON(),
        wallet: "/api/wallets/" + idCurrentWallet
    },
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('JWT') //the token is a variable which holds the token
            }
        })
}

export default {
    postTransactions
}