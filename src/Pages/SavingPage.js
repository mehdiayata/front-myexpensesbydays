import React, { useEffect, useState } from 'react';
import BudgetPreviewCalcul from '../Components/Budget/BudgetPreviewCalcul';
import WalletSaving from '../Components/Wallet/WalletSaving';
import BreadCrumbNav from '../Components/Navigation/BreadcrumbNav';
const SavingPage = () => {
    const [spinner, setSpinner] = useState(false);
    const [onSubmitSaving, setOnSubmitSaving] = useState(false);
    
    useEffect(() => {
        
    })
    return (
        <div className='saving-page'>
            <BreadCrumbNav title={'Saving'}/>
            <WalletSaving spinner={spinner} setSpinner={setSpinner} setOnSubmitSaving={setOnSubmitSaving}/>
        </div>
    );
};

export default SavingPage;