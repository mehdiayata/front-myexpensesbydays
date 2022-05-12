import React, { useEffect, useState } from 'react';
import Budget from './Budget';
import BudgetAdd from './BudgetAdd';

const Income = () => {
    
    const [walletSelected, setWalletSelected] = useState(null);

    useEffect(() => {
        // GET wallet if not null
        if(walletSelected === null) {
            setWalletSelected(localStorage.getItem('current_wallet'));
        } else {
            alert('Erreur, aucun wallet par défaut est défini');
        }
    }, []);

    return (
        <div className='income'>
            <Budget walletSelected={walletSelected} />
            
        </div>
    );
};

export default Income;