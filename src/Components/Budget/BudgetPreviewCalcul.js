import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import calculatorService from '../../Services/calculator.service';
import walletService from '../../Services/wallet.service';

const BudgetPreviewCalcul = (props) => {
    const [coasts, setCoasts] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [previewBudget, setPreviewBudget] = useState();
    const { setSpinner } = props;

    useEffect(() => {
        if (localStorage.getItem('current_wallet')) {

            walletService.getWalletBudgets(localStorage.getItem('current_wallet')).then((resp) => {
                // Assign budget
                resp.data['hydra:member'].map((budget) => {
                    if (budget.coast === false) {
                        incomes.push(budget)
                    } else {
                        coasts.push(budget)
                    }
                })

                setPreviewBudget(calculatorService.budgetPreviewCalcul(incomes, coasts));

                localStorage.setItem('budget_preview', calculatorService.budgetPreviewCalcul(incomes, coasts));

                setSpinner(false);
            })
        }

    }, [])

    return (
        <div className='budget-preview-calcul'>
            <p className="budget-preview-label">Vos revenu estimé par mois sont de :</p>
            <p className="budget-preview-amount">{previewBudget === undefined ? <Spinner animation='border' /> : previewBudget.toFixed(2) } €</p>
        </div>
    );
};

export default BudgetPreviewCalcul;