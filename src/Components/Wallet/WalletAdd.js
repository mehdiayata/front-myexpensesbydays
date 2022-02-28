import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';
import walletService from '../../Services/wallet.service';

const WalletAdd = (props) => {
    const { addWalletButton } = props;
    const { setAddWalletButton } = props;
    const [amount, setAmount] = useState();
    const [main, setMain] = useState(false);
    const { setOnSubmitAdd } = props;


    const addWallet = (e) => {

        e.preventDefault();

        walletService.postWallet(amount).then((resp) => {

            // Change le wallet principal (resp.data.id = id nouveau wallet principal)
            if (main == true) {
                walletService.putMainWallet(resp.data.id).then((resp) => {
                    setMain(false);
                })

                localStorage.setItem('current_wallet', resp.data.id);
            }

            setMain(false);

            // Reset
            setAmount(null);
            e.target.reset();

            setOnSubmitAdd(true);
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
            <div className="wallet-add-header">
                <h5>Add Wallet</h5>
                {addWalletButton == true &&
                    <Button onClick={() => setAddWalletButton(false)}> <AiOutlineClose /> </Button>
                }
            </div>

            <Form onSubmit={addWallet} method='post' id="wallet-add-form">
                <Form.Group controlId='wallet-add-form-amount'>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control required name="amount" type="number" defaultValue="0" placeholder="352" onChange={(e) => setAmount(e.target.value)} />
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