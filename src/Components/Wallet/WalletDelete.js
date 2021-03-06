import { Alert, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import walletService from '../../Services/wallet.service';

const WalletDelete = (props) => {
    const { idWalletDelete } = props;
    const { setDeleteWalletButton } = props;
    const { setOnSubmitDelete } = props;
    const [wallets, setWallets] = useState([]);
    const { setSpinner } = props;

    useEffect(() => {
        walletService.getWallets().then((resp) => {
            setWallets(resp.data['hydra:member']);
        });
    })

    const handleValidDeleteButton = (valid) => {

        setDeleteWalletButton(false);

        // si le bouton Yes est cliqué
        if (valid === true) {
            setSpinner(true);

            // Si le main wallet est éditer
            if (editMainWallet() !== false) {
                editMainWallet().then((resp) => {
                    walletService.deleteWallet(idWalletDelete).then((resp => {

                        // Variable permettant d'actualiser la liste
                        setOnSubmitDelete(true);
                        setSpinner(false);

                    }));

                });
            } else {
                walletService.deleteWallet(idWalletDelete)
                    .then((resp => {

                        // Variable permettant d'actualiser la liste
                        setOnSubmitDelete(true);
                        setSpinner(false);

                    })
                    ).catch((error) => {
                        if(error.response.data["hydra:description"] === "Unable to delete your only wallet") {
                            alert(error.response.data["hydra:description"]);
                        }

                        setSpinner(false);
                    })
            }
        }
    }

    const editMainWallet = () => {

        let launchDelete = false;
        let newMainWallet = null;

        wallets.map((wallet) => {
            if (wallet.id === idWalletDelete && wallet.main === true) {
                launchDelete = true;
            }

            // Attribution d'un wallet
            if (wallet.id !== idWalletDelete) {
                newMainWallet = wallet.id;
            }
        })


        if (launchDelete === true && newMainWallet !== null) {
            return walletService.putMainWallet(newMainWallet);
        }

        return false;
    }

    return (
        <div className="wallet-delete">
            <Alert variant="danger">
                <p>
                    Do you confirm delete your wallet <br />
                    (If your delete, your main wallet, a  new main wallet you will be assigned)
                </p>

                <Button variant="danger" onClick={(e) => handleValidDeleteButton(true)}> Yes </Button>
                <Button variant="secondary" onClick={(e) => handleValidDeleteButton(false)}> No </Button>

            </Alert>
        </div>
    );

};

export default WalletDelete;