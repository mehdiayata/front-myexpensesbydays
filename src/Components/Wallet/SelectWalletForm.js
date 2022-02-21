import React, { useEffect, useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import walletService from '../../Services/wallet.service';


const SelectWalletForm = (props) => {

    const { setWalletSelected } = props;
    const [idCurrentWallet, setIdCurrentWallet] = useState(null);
    const [wallets, setWallets] = useState();

    useEffect(() => {

        // Attribut automatiquement l'idCurrentWallet au current_wallet contenu dans le localStorage
        if(idCurrentWallet == null) {
            setIdCurrentWallet(localStorage.getItem('current_wallet'));
        }

        setWalletSelected(idCurrentWallet);

    
        // Get wallet (by user), and add idCurrentWallet and wallet
        walletService.getWallets().then((res) => {
            setWallets(res.data['hydra:member']);
        })

    }, [idCurrentWallet]);


    return (
        <div className="select-wallet-form">
            <Form>
                {wallets != null &&
                    <Form.Group controlId="selectWallet">

                        <Form.Control as="select" custom='true' defaultValue={idCurrentWallet} onChange={(e) => setIdCurrentWallet(e.target.value)}>
                            {wallets.map((wallet) => (
                                <option key={wallet.id} value={wallet['id']}> Wallet : {wallet.id} </option>
                            ))}

                        </Form.Control>
                    </Form.Group>

                }

            </Form>

        </div>
    );
};

export default SelectWalletForm;