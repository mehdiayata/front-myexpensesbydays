import React, { useEffect, useState } from 'react';
import calculatorService from '../../Services/calculator.service';
import walletService from '../../Services/wallet.service';

const BudgetPreviewCalcul = () => {
    const [coasts, setCoasts] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [previewBudget, setPreviewBudget] = useState();

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

            })
        } else {
            console.log('You are not connected');
        }



    }, [])

    return (
        <div className='budget-preview-calcul'>
            <h1>{previewBudget}</h1>
        </div>
    );
};

export default BudgetPreviewCalcul;