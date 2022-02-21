import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import walletService from '../../Services/wallet.service';

const WalletAdd = (props) => {
    const { setOnSubmitWalletAdd } = props;
    const [amount, setAmount] = useState();
    const [main, setMain] = useState(false);


    const addWallet = (e) => {

        e.preventDefault();

        walletService.postWallet(amount).then((resp) => {

            // Change le wallet principal (resp.data.id = id nouveau wallet principal)
            if (main == true) {
                walletService.putMainWallet(resp.data.id).then((resp) => {

                    setOnSubmitWalletAdd(true);
                    setMain(false);
                })
                
                localStorage.setItem('current_wallet', resp.data.id);
            }

            setOnSubmitWalletAdd(true);
            setMain(false);

            // Reset
            setAmount(null);
            e.target.reset();
        })


    }

    // Définit si le wallet est principal ou pas
    const handleAddMainWallet = () => {
        if (main == false) {
            setMain(true);
        } else {
            setMain(false);
        }
    }


    return (
        <div className="wallet-add">
            <h5> Wallet Add </h5>

            <Form onSubmit={addWallet} method='post' id="wallet-add-form">
                 <Form.Group controlId='wallet-add-form-amount'>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control required name="amount" type="number" placeholder="352" onChange={(e) => setAmount(e.target.value)} />
                </Form.Group> 

                <Form.Check type="switch" id="add-wallet-main" onChange={(e) => handleAddMainWallet(e.target.value)} label="Check if this wallet is the main one" />

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default WalletAdd;