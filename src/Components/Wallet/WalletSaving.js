import React from 'react';
import BudgetPreviewCalcul from '../Budget/BudgetPreviewCalcul';
import SavingForm from '../Budget/SavingForm';

const WalletSaving = () => {
    return (
        <div className='wallet-saving'>
            <BudgetPreviewCalcul />
            <SavingForm />
            
        </div>
    );
};

export default WalletSaving;