import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import budgetService from '../../Services/budget.service';
import BudgetAdd from './BudgetAdd';

const Income = (props) => {

    const [walletSelected, setWalletSelected] = useState(null);
    const [coast, setCoast] = useState(true);
    const { setOnSubmitBudget } = props;
    const { setSpinner } = props;
    const { spinner } = props;
    const [incomes, setIncomes] = useState(null);
    const { onSubmit } = props;

    useEffect(() => {
        setSpinner(true);

        setOnSubmitBudget(false);
        setIncomes(null);

        // GET wallet if not null
        if (walletSelected === null) {
            setWalletSelected(localStorage.getItem('current_wallet'));
        } else {
            
            budgetService.getIncome(walletSelected).then((resp) => {

                setIncomes(resp.data['hydra:member'])
                setSpinner(false);
            })

        }

    }, [walletSelected, onSubmit]);

    return (spinner ?
        <Spinner animation="border" />
        :
        <div className="income">

            <BudgetAdd setOnSubmitBudget={setOnSubmitBudget} onSubmit={onSubmit} coast={0} walletSelected={walletSelected} setSpinner={setSpinner} incomes={incomes} />

        </div>
    );
};

export default Income;