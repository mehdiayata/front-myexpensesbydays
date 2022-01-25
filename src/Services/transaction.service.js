import axios from "axios";

const getTransaction = (idTransaction) => {
    return axios.get('http://127.0.0.1:8000/api/transactions/' + idTransaction, {

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

    return axios.post('http://127.0.0.1:8000/api/transactions', {
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

    return axios.put('http://127.0.0.1:8000/api/transactions/'+idTransaction, {
        amount: amount,
        editAt: date.toJSON(),
    })
}

const deleteTransaction = (idTransaction) => {
    return axios.delete('http://127.0.0.1:8000/api/transactions/'+idTransaction);
}

export default {
    postTransactions,
    getTransaction,
    putTransaction,
    deleteTransaction
}