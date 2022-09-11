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
        if (walletSelected !== null) {
            walletService.getWallet(walletSelected).then((resp) => {
                setWalletAmount(resp.data.amount);
            });
        }

    }, [walletSelected, onSubmit, walletAmount])

    const displayWalletAmount = () => {
        if (walletAmount !== null) {
            {
                return (
                    <div className="transaction-list-header-wallet-amount">
                        <p className="wallet-amount"> {walletAmount} €</p>
                    </div>
                )
            }

        } else {
            return (
                <>
                </>
            )
        }
    }

    return (
        <div className="transaction-list-header">
            <SelectWalletForm setWalletSelected={setWalletSelected} />

            {addTransactionButton === false && <Button onClick={() => setAddTransactionButton(true)}> Add </Button>}

            {displayWalletAmount()}


        </div>

    );
};

export default TransactionListHeader;