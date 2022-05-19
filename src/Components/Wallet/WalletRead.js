import React, { useEffect, useState } from 'react';
import walletService from '../../Services/wallet.service';

const WalletRead = (props) => {
    const [wallet, setWallet] = useState([]);
    const {setSaving} = props;
    const {setSavingReal} = props;
    const {onSubmitAdd} = props;

    useEffect(() => {
        walletService.getWallet(localStorage.getItem('current_wallet')).then((resp) => {
            setWallet(resp.data);
            setSaving(resp.data.saving);
            setSavingReal(resp.data.savingReal)
        
        })
    }, [onSubmitAdd])
    
    return (
        
        <div className="wallet-read">
            <h3> Wallet Amount</h3>
            <p>{wallet.amount}</p>
        </div>
    );
};

export default WalletRead;