import axios from "axios"
import host from "./server.service"

const postBudget = (amount, arrayDate, idWallet) => {
    return axios.post(host + '/budgets', {
        amount: amount,
        wallet: 'api/wallets/' + idWallet,
        dueDate: arrayDate
    },
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('JWT') //the token is a variable which holds the token
            }
        })
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    postBudget,
}
