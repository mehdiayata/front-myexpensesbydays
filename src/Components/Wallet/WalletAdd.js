import React, {useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';
import walletService from '../../Services/wallet.service';

const WalletAdd = (props) => {
    const { addWalletButton } = props;
    const { setAddWalletButton } = props;
    const [amount, setAmount] = useState('0');
    const [main, setMain] = useState(false);
    const { setOnSubmitAdd } = props;
    const { setSpinner } = props;

    const addWallet = (e) => {
        setSpinner(true);

        e.preventDefault();

        walletService.postWallet(amount).then((resp) => {

            // Change le wallet principal (resp.data.id = id nouveau wallet principal)
            if (main === true) {
                walletService.putMainWallet(resp.data.id).then((resp) => {
                    setMain(false);
                })

                localStorage.setItem('current_wallet', resp.data.id);
            }

            setSpinner(false);
            // Reset
            setAmount('0');
            e.target.reset();

            setOnSubmitAdd(true);
        })
    }

    const test = () => {
        console.log(main);
        setMain(!main);
    }


    return (
        <div className="wallet-add">
            <div className="wallet-add-header">
                <h5>Add Wallet</h5>
                {addWalletButton === true &&
                    <Button onClick={() => setAddWalletButton(false)}> <AiOutlineClose /> </Button>
                }
            </div>

            <Form onSubmit={addWallet} method='post' id="wallet-add-form">
                <Form.Group controlId='wallet-add-form-amount'>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control required name="amount" type="number" defaultValue={amount} placeholder="352" onChange={(e) => setAmount(e.target.value)} />
                </Form.Group>

                <Form.Check type="checkbox" value={main} id="add-wallet-main" onClick={() => test()} label="Check if this wallet is the main one" />

                <Button variant="success" type="submit">
                    Save
                </Button>
            </Form>
        </div>
    );
};

export default WalletAdd;