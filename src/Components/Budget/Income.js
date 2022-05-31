import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Budget from './Budget';
import BudgetAdd from './BudgetAdd';

const Income = (props) => {

    const [walletSelected, setWalletSelected] = useState(null);
    const { setOnSubmitBudget } = props;
    const [coast, setCoast] = useState(false);
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
        <div className='income'>
            <BudgetAdd setOnSubmitBudget={setOnSubmitBudget} coast={coast} walletSelected={walletSelected} setSpinner={setSpinner}/>

        </div>
    );
};

export default Income;