import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import BudgetPreviewCalcul from '../Budget/BudgetPreviewCalcul';
import SavingForm from '../Budget/SavingForm';

const WalletSaving = (props) => {
    const { setOnSubmitSaving } = props;
    const { setSpinner } = props;
    const { spinner } = props;

    return (spinner ?
            <Spinner />
            :
            <div className='wallet-saving'>
                <BudgetPreviewCalcul setSpinner={setSpinner}/>
                <SavingForm setOnSubmitSaving={setOnSubmitSaving} setSpinner={setSpinner}/>

            </div>
    );
};

export default WalletSaving;