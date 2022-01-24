import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import walletService from '../Services/wallet.service';

const WalletAdd = (props) => {
    const {setOnSubmitWalletAdd} = props;
    const [amount, setAmount] = useState();
    const [main, setMain] = useState(false);

    const addWallet = (e) => {

        e.preventDefault();

        walletService.postWallet(amount).then((resp) => {

            // Change le wallet principal (resp.data.id = id nouveau wallet principal)
            if (main == true) {
                walletService.putMainWallet(resp.data.id).then((resp) => {
                })

            }

            setOnSubmitWalletAdd(true);

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
        <div className="walletAdd">
            <h1> Wallet Add </h1>

            <Form onSubmit={addWallet} method='post' >
                <Form.Group controlId='form-wallet-add-amount'>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control required name="amount" type="number" placeholder="352" onChange={(e) => setAmount(e.target.value)} />
                </Form.Group>


                {['checkbox'].map((type) => (
                    <div key={type} className="mb-3">
                        <Form.Check type={type} id={`add-wallet-main-${type}`}>
                            <Form.Check.Label>{'Main'}</Form.Check.Label>
                            <Form.Check.Input type={type} isValid onChange={(e) => handleAddMainWallet(e.target.value)} />
                        </Form.Check>
                    </div>
                ))}


                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default WalletAdd;