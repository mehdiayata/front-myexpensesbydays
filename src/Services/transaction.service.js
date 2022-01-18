import axios from "axios";

const postTransactions = (amount, idCurrentWallet) => {

    let date = new Date();
    //console.log(date.toJSON());

    axios.post('http://127.0.0.1:8000/api/transactions', {
        amount: amount,
        createdAt: date.toJSON(),
        wallet: "/api/wallets/" + idCurrentWallet
    }, 
    {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('JWT') //the token is a variable which holds the token
        }
    }).then((resp) => {console.log(resp)});
}

export default {
    postTransactions
}