import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import calculatorService from '../../Services/calculator.service';

const AuthorizedExpense = (props) => {
    const [authorizedExpense, setAuthorizedExpense] = useState();
    const { onSubmitAdd } = props;
    const { saving } = props;
    const { savingReal } = props;

    useEffect(() => {
        if (saving !== null && savingReal !== null) {
            setAuthorizedExpense(calculatorService.authorizedExpense(localStorage.getItem('budget_preview'), saving, savingReal));
            localStorage.setItem('authorized_expense', calculatorService.authorizedExpense(localStorage.getItem('budget_preview'), saving, savingReal));
        }
    }, [saving, savingReal, authorizedExpense])

    const overdraft = () => {
        if (authorizedExpense < 0) {
            return (
                <p className='overdraft'>YOU ARE overdraft for this day</p>
            )
        }
    }

    return (
        <div className='authrorized-expense'>
            <h5>You can daily spend</h5>

            <h1>{authorizedExpense === null || isNaN(authorizedExpense) ? <Spinner animation='border' /> : authorizedExpense + '€'} </h1>
            {overdraft()}


        </div>
    );
};

export default AuthorizedExpense;