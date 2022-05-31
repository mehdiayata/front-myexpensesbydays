import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import Budget from './Budget';
import BudgetAdd from './BudgetAdd';

const Coast = (props) => {
    const [walletSelected, setWalletSelected] = useState(null);
    const [coast, setCoast] = useState(true);
    const { setOnSubmitBudget } = props;
    const { setSpinner } = props;
    const { spinner } = props;


    useEffect(() => {
        setSpinner(true);

        // GET wallet if not null
        if (walletSelected === null) {
            setWalletSelected(localStorage.getItem('current_wallet'));
            setSpinner(false);
        } else {
            alert('Erreur, aucun wallet par défaut est défini');
        }
    }, []);

    return (spinner ?
            <Spinner animation="border" />
            :
            <div className="coast">

                <BudgetAdd setOnSubmitBudget={setOnSubmitBudget} coast={coast} walletSelected={walletSelected} setSpinner={setSpinner} />
            
        </div>
    );
};

export default Coast;