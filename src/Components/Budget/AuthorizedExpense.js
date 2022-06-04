import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import calculatorService from '../../Services/calculator.service';
import walletService from '../../Services/wallet.service';

const AuthorizedExpense = (props) => {
    const [authorizedExpense, setAuthorizedExpense] = useState(null);
    const {onSubmitAdd} = props;
    const {saving} = props;
    const {savingReal} = props;

    useEffect(() => {
        setAuthorizedExpense(calculatorService.authorizedExpense(localStorage.getItem('budget_preview'), saving, savingReal));
        localStorage.setItem('authorized_expense', calculatorService.authorizedExpense(localStorage.getItem('budget_preview'), saving, savingReal));
    }, [saving, savingReal, authorizedExpense])

    const overdraft = () => {
        if(authorizedExpense < 0) {
            return (
            <p>YOU ARE overdraft for this day</p>
            )
        }
    }

    return (
        <div className='authrorized-expense'>
            <h5>Vous pouvez dépenser par jour : </h5>
             
            <h1>{authorizedExpense === null || isNaN(authorizedExpense) ? <Spinner animation='border' /> : authorizedExpense + '€'} </h1>
            {overdraft()}
             

        </div>
    );
};

export default AuthorizedExpense;