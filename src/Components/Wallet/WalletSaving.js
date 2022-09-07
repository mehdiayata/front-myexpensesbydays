import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import BudgetPreviewCalcul from '../Budget/BudgetPreviewCalcul';
import SavingForm from '../Budget/SavingForm';

const WalletSaving = (props) => {
    // const {authorizedExpenses} = props;
    const {saving} = props;
    const {setOnSubmit} = props;

    return (
            <div className='wallet-saving'>
                {/* <BudgetPreviewCalcul authorizedExpenses={authorizedExpenses} /> */}
                <SavingForm setOnSubmit={setOnSubmit} saving={saving} />

            </div>
    );
};

export default WalletSaving;