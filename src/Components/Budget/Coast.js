import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import budgetService from '../../Services/budget.service';
import BudgetAdd from './BudgetAdd';

const Coast = (props) => {
    const [walletSelected, setWalletSelected] = useState(null);
    const [coast, setCoast] = useState(true);
    const { setOnSubmitBudget } = props;
    const { setSpinner } = props;
    const { spinner } = props;
    const [coasts, setCoasts] = useState(null);
    const { onSubmit } = props;

    useEffect(() => {
        setSpinner(true);
        
        setOnSubmitBudget(false);
        setCoasts(null);

        // GET wallet if not null
        if (walletSelected === null) {
            setWalletSelected(localStorage.getItem('current_wallet'));
        } else {
            budgetService.getCoast(walletSelected).then((resp) => {
                
                setCoasts(resp.data['hydra:member'])

                setSpinner(false);
            })

        }

    }, [walletSelected, onSubmit]);

    return (spinner ?
        <Spinner animation="border" />
        :
        <div className="coast">

            <BudgetAdd setOnSubmitBudget={setOnSubmitBudget} onSubmit={onSubmit} coast={1} walletSelected={walletSelected} setSpinner={setSpinner} coasts={coasts} />

        </div>
    );
};

export default Coast;