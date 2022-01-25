import { Alert, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import walletService from '../../Services/wallet.service';

const WalletDelete = (props) => {
    const {idWalletDelete } = props;
    const {wallets } = props;
    const {handleDeleteButton} = props;
    const {setOnSubmitWalletDelete} = props;

    const [alertWallet, setAlertWallet] = useState(true);

    const handleValidDeleteButton = (valid) => {
        handleDeleteButton(false);

        setAlertWallet(false);

        // si le bouton Yes est cliqué
        if (valid == true) {

            if (editMainWallet() != false) {
                editMainWallet().then((resp) => {
                    walletService.deleteWallet(idWalletDelete).then((resp => {

                        // Variable permettant d'actualiser la liste
                        setOnSubmitWalletDelete(true);

                    }));

                });
            } else {
                walletService.deleteWallet(idWalletDelete).then((resp => {

                    // Variable permettant d'actualiser la liste
                    setOnSubmitWalletDelete(true);

                }));
            }

        }
    }

    const editMainWallet = () => {

        let launchDelte = false;
        let newMainWallet = null;

        wallets.map((wallet) => {
            if (wallet.id == idWalletDelete && wallet.main == true) {
                launchDelte = true;
            }

            // Attribution d'un wallet
            if (wallet.id != idWalletDelete) {
                newMainWallet = wallet.id;
            }
        })


        if (launchDelte == true && newMainWallet != null) {
            return walletService.putMainWallet(newMainWallet);
        }

        return false;
    }

    
    if (alertWallet == true) {
        return (
            <div className="alertWallet">
                <Alert variant="danger">
                    <p>
                        Do you confirm delete your wallet ?
                        (If your delete, your main wallet, a  new main wallet you will be assigned)
                </p>

                    <Button onClick={(e) => handleValidDeleteButton(true)}> Yes </Button>
                    <Button onClick={(e) => handleValidDeleteButton(false)}> No </Button>
                </Alert>
            </div>
        );
    } else {
        return (
            <div className="alertWallet">

            </div>
        )
    }
};

export default WalletDelete;