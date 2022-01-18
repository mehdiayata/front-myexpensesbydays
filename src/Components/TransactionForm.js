
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import transactionService from '../Services/transaction.service';
import walletService from '../Services/wallet.service';
import DisplayTransaction from './DisplayTransaction';

const TransactionForm = () => {

    const [posiNega, setPosiNega] = useState(false);
    const [amount, setAmount] = useState();
    const [idCurrentWallet, setIdCurrentWallet] = useState(); 
    const [wallets, setWallets] = useState([]);
    const [onSubmit, setOnSubmit] = useState(false);

    useEffect(() => {
        // Get wallet (by user), and add idCurrentWallet and wallet
        walletService.getWallets().then((res) => {
            setIdCurrentWallet(localStorage.getItem('current_wallet'));
            setWallets(res.data['hydra:member']);
        })
    }, []);


    // A dev plus tard
    const handleChange = (e) => {
        setPosiNega(!posiNega);
    }

    // Créer transaction selon le wallet sélectionné 
    const handleTransaction = (e) => {
        e.preventDefault();

    // Vérifie si le submit est envoyé ou non
        if (onSubmit == true) {
            setOnSubmit(false);
        } else {

            setOnSubmit(true);
        }

        // Post Transaction
        transactionService.postTransactions(amount, idCurrentWallet);

        // Asign null in input amount and setAmount 
        document.querySelector('#transaction-amount').value = null;
        setAmount(undefined);
    }

    // Récupère le wallet choisis
    const handleCurrentWallet = (e) => {
        setIdCurrentWallet(e);
    }

    return (
        <div className='transactionForm'>
            <Form onSubmit={handleTransaction}>

                <Form.Group controlId="selectWallet">
                    <Form.Label>Select your wallet</Form.Label>
                    <Form.Control as="select" custom='true' onChange={(e) => handleCurrentWallet(e.target.value)} value={idCurrentWallet}>
                        {wallets.map((wallet) => (
                            <option key={wallet.id} value={wallet['id']}>{wallet.id} </option>
                        ))}

                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Check type="switch" id="transaction-positive-negative" onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Control type="number" id="transaction-amount" onChange={(e) => { setAmount(e.target.value) }} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>

            <DisplayTransaction idCurrentWallet={idCurrentWallet} onSubmit={onSubmit} />
        </div>
    );
};

export default TransactionForm;