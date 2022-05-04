import axios from "axios";
import host from "./server.service"

const getTransaction = (idTransaction) => {
    return axios.get(host + '/transactions/' + idTransaction, {

    }, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('JWT') //the token is a variable which holds the token
        }
    }
    )

}

const postTransactions = (amount, idTransaction) => {

    amount = amount.toString();
    let date = new Date();
    //console.log(date.toJSON());

    return axios.post(host + '/transactions', {
        amount: amount,
        createdAt: date.toJSON(),
        wallet: "/api/wallets/" + idTransaction
    },
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('JWT') //the token is a variable which holds the token
            }
        })
}

const putTransaction = (amount, idTransaction) => {
    amount = amount.toString();
    let date = new Date();

    return axios.put(host + '/transactions/'+idTransaction, {
        amount: amount,
        editAt: date.toJSON(),
    })
}

const deleteTransaction = (idTransaction) => {
    return axios.delete(host + '/transactions/'+idTransaction);
}

export default {
    postTransactions,
    getTransaction,
    putTransaction,
    deleteTransaction
}