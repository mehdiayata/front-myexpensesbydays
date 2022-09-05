import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import calculatorService from '../../Services/calculator.service';

const AuthorizedExpense = (props) => {
    const { authorizedExpenses } = props;
    const { onSubmitAdd } = props;

    const overdraft = () => {
        if (authorizedExpenses < 0) {
            return (
                <p className='overdraft'>YOU ARE overdraft for this day</p>
            )
        }
    }

    return (
        <div className='authrorized-expense'>
            <h5>You can daily spend</h5>

            <p>{authorizedExpenses} €</p>
            {overdraft()}

        </div>
    );
};

export default AuthorizedExpense;