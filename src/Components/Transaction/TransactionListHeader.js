import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import walletService from '../../Services/wallet.service';
import SelectWalletForm from '../Wallet/SelectWalletForm';

const TransactionListHeader = (props) => {
    const { setWalletSelected } = props;
    const { walletSelected } = props;
    const { addTransactionButton } = props;
    const { setAddTransactionButton } = props;
    const { onSubmit } = props;
    const [walletAmount, setWalletAmount] = useState(null);

    useEffect(() => {
        // GET amount du wallet sélectionner
        walletService.getWallet(walletSelected).then((resp) => {
            setWalletAmount(resp.data.amount);
        });

    }, [walletSelected, onSubmit, walletAmount])

    return (
        <div className="transaction-list-header">
            <SelectWalletForm setWalletSelected={setWalletSelected} />

            <div className="transaction-list-header-wallet-amount">
                <p>Amount : {walletAmount}</p>
            </div>


            {addTransactionButton === false && <Button onClick={() => setAddTransactionButton(true)}> Add </Button>}

        </div>

    );
};

export default TransactionListHeader;