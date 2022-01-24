import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import walletService from '../Services/wallet.service';

const WalletEdit = (props) => {
    const { idWalletEdit } = props;
    const { setOnSubmitWalletEdit } = props;
    const { handleOnSubmitWalletEdit } = props;
    const [walletInfo, setWalletInfo] = useState();
    const [amount, setAmount] = useState('');
    const [main, setMain] = useState();


    // Récupérer les infos du wallet à éditer 
    useEffect(() => {
        walletService.getWallet(idWalletEdit).then((resp) => {

            setWalletInfo(resp.data);
            setAmount(resp.data.amount);

            if (resp.data.main == true) {
                setMain(true);
            } else {
                setMain(false);
            }
        })
    }, [])


    const editWallet = (e) => {
        e.preventDefault();

        walletService.putWallet(idWalletEdit, amount).then((resp) => {

            if (main == true) {
                walletService.putMainWallet(idWalletEdit);
            }


            setOnSubmitWalletEdit(true);
        })

    }

    const handleEditMainWallet = (e) => {

        if (main == true) {
            setMain(false);
        } else {
            setMain(true)
        }
    }

    return (
        <div className="walletEdit">
            <h1> Wallet Add </h1>

            <Form onSubmit={editWallet} method='post' >
                <Form.Group controlId='form-wallet-edit-amount'>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control required name="amount" value={amount} type="number" onChange={(e) => setAmount(e.target.value)} />
                </Form.Group>

                {['checkbox'].map((type) => (
                    <div key={`default-${type}`} className="mb-3">
                        <Form.Check
                            type={type}
                            id={`default-${type}`}
                            label={`default ${type}`}
                            defaultChecked={main}
                            onChange={(e) => handleEditMainWallet(e)}
                        />
                    </div>
                ))}

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default WalletEdit;