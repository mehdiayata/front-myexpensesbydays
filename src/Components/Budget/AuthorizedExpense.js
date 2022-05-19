import React, { useEffect, useState } from 'react';
import calculatorService from '../../Services/calculator.service';
import walletService from '../../Services/wallet.service';

const AuthorizedExpense = (props) => {
    const [authorizedExpense, setAuthorizedExpense] = useState();
    const {onSubmitAdd} = props;
    const {saving} = props;
    const {savingReal} = props;

    useEffect(() => {
        setAuthorizedExpense(calculatorService.authorizedExpense(localStorage.getItem('budget_preview'), saving, savingReal));
        localStorage.setItem('authorized_expense', calculatorService.authorizedExpense(localStorage.getItem('budget_preview'), saving, savingReal));
    }, [onSubmitAdd, saving, savingReal])

    const overdraft = () => {
        if(authorizedExpense < 0) {
            return (
            <p>YOU ARE overdraft for this day</p>
            )
        }
    }

    return (
        <div className='authrorized-expense'>
            <h1>{authorizedExpense}</h1>
            {overdraft()}
             

        </div>
    );
};

export default AuthorizedExpense;