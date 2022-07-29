import axios from "axios"
import host from "./server.service"

const postBudget = (amount, arrayDate, idWallet, coast) => {
    return axios.post(host + '/budgets', {
        amount: amount,
        wallet: 'api/wallets/' + idWallet,
        dueDate: arrayDate,
        coast: coast
    },
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('JWT')
            }
        })
}

const getCoast = (idWallet) => {
    return axios.get(host + '/wallets/' + idWallet + '/budgets/coasts', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('JWT')
        }
    })
}

const putCoast = (idBudget, amount, arrayDate, coast) => {
    return axios.put(host + '/budgets/' + idBudget, {
        amount: amount,
        dueDate: arrayDate,
        coast: coast
    }, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('JWT')
        }
    })
}

const deleteBudget = (idBudget) => {
    return axios.delete(host + '/budgets/' + idBudget, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('JWT')
        }
    })
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    postBudget,
    getCoast,
    putCoast,
    deleteBudget
}
