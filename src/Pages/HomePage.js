import React, { useEffect, useState } from 'react';
import AuthorizedExpense from '../Components/Budget/AuthorizedExpense';
import TransactionAdd from '../Components/Transaction/TransactionAdd';
import WalletRead from '../Components/Wallet/WalletRead';

const HomePage = () => {
    const [walletSelected, setWalletSelected] = useState();
    const [onSubmitAdd, setOnSubmitAdd] = useState(false);
    const [addTransactionButton, setAddTransactionButton] = useState(false);
    const [spinner, setSpinner] = useState();
    const [saving, setSaving] = useState();
    const [savingReal, setSavingReal] = useState();

    useEffect(() => {
        setOnSubmitAdd(false);
        setWalletSelected(localStorage.getItem('current_wallet'));
    }, [onSubmitAdd, spinner])

    return (
        <div className='homepage'>
        <WalletRead setSaving={setSaving} setSavingReal={setSavingReal} onSubmitAdd={onSubmitAdd}/> 
            <AuthorizedExpense onSubmitAdd={onSubmitAdd} 
                    saving={saving}
                    savingReal={savingReal}/>    
            
            <TransactionAdd walletSelected={walletSelected} setOnSubmitAdd={setOnSubmitAdd}
                    addTransactionButton={addTransactionButton}
                    setAddTransactionButton={setAddTransactionButton}
                    setSpinner={setSpinner}
                />       

        </div>
    );
};

export default HomePage;