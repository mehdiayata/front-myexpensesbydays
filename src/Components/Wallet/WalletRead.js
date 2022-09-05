import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import walletService from '../../Services/wallet.service';

const WalletRead = (props) => {
    const [wallet, setWallet] = useState([]);
    const {onSubmitAdd} = props;
    const {amount} = props;

    // useEffect(() => {
    //     walletService.getWallet(localStorage.getItem('current_wallet')).then((resp) => {
    //         setWallet(resp.data);
    //         setSaving(resp.data.saving);
    //         setSavingReal(resp.data.savingReal)
    //     })
    // }, [onSubmitAdd, wallet])
    
    return (
        
        <div className="wallet-read">
            <h5> Wallet Amount</h5>
            <p>{amount} €</p>
            
        </div>
    );
};

export default WalletRead;