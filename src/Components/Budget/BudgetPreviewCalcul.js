import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import calculatorService from '../../Services/calculator.service';
import walletService from '../../Services/wallet.service';

const BudgetPreviewCalcul = (props) => {
    const [previewBudget, setPreviewBudget] = useState();
    const { authorizedExpenses } = props;

    useEffect(() => {
        if (localStorage.getItem('current_wallet')) {
            // Next Update
        }

    }, [])

    return (
        <div className='budget-preview-calcul'>
            <p className="budget-preview-label">Vos revenu estimé par mois sont de :</p>
            <p className="budget-preview-amount"></p>
        </div>
    );
};

export default BudgetPreviewCalcul;