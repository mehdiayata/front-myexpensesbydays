import React, { useEffect, useState } from 'react';
import WalletSaving from '../Components/Wallet/WalletSaving';
import BreadCrumbNav from '../Components/Navigation/BreadcrumbNav';
import walletService from '../Services/wallet.service';
import { Spinner } from 'react-bootstrap';

const SavingPage = () => {
    const [spinner, setSpinner] = useState(false);
    const [onSubmitSaving, setOnSubmitSaving] = useState(false);
    const [wallet, setWallet] = useState(null);

    useEffect(() => {
        walletService.getMainWallet().then((resp => {
            setWallet(resp.data);
        }))
    }, [wallet])

    const displayWalletSaving = () => {
        if (wallet !== null) {
            return (
                <WalletSaving setOnSubmit={setOnSubmitSaving} saving={wallet.saving} />
            )

        } else {
            return (
                <div className='spinner-page'>
                    <Spinner animation='border' className="spinner" />
                </div>
            )
        }
    }
    return (
        <div className='saving-page'>
            <BreadCrumbNav title={'Saving'} />
            {displayWalletSaving()}
        </div>
    );
};

export default SavingPage;