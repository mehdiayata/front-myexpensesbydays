import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import walletService from '../../Services/wallet.service';

const WalletRead = (props) => {
    const [wallet, setWallet] = useState([]);
    const {setSaving} = props;
    const {setSavingReal} = props;
    const {onSubmitAdd} = props;
    const {setSpinner} = props;

    useEffect(() => {
        walletService.getWallet(localStorage.getItem('current_wallet')).then((resp) => {
            setWallet(resp.data);
            setSaving(resp.data.saving);
            setSavingReal(resp.data.savingReal)
        })
    }, [onSubmitAdd, wallet])
    
    return (
        
        <div className="wallet-read">
            <h5> Wallet Amount</h5>
            <h1>{wallet === [] || wallet.amount === undefined ? <Spinner animation='border' /> : wallet.amount + '€'} </h1>
            
        </div>
    );
};

export default WalletRead;