import React, { useEffect, useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';
import walletService from '../../Services/wallet.service';

const WalletEdit = (props) => {
    const { idWalletEdit } = props;
    const { setOnSubmitEdit } = props;
    const { editWalletButton } = props;
    const { setEditWalletButton } = props;
    const [amount, setAmount] = useState();
    const [main, setMain] = useState();
    const { setSpinner } = props;
    const { spinner } = props;


    // Récupérer les infos du wallet à éditer 
    useEffect(() => {
        setSpinner(true);

        if (idWalletEdit) {
            walletService.getWallet(idWalletEdit).then((resp) => {

                setAmount(resp.data.amount);

                if (resp.data.main === true) {
                    setMain(true);
                } else {
                    setMain(false);
                }


                setSpinner(false);
            })
        }

    }, [idWalletEdit])


    const editWallet = (e) => {
        e.preventDefault();

        setSpinner(true);

        walletService.putWallet(idWalletEdit, amount).then((resp) => {

            if (main === true) {
                walletService.putMainWallet(idWalletEdit).then(
                    localStorage.setItem('current_wallet', idWalletEdit)
                );
            }
            setOnSubmitEdit(true);
            setSpinner(false);

        })

    }

    const handleEditMainWallet = (e) => {
        if (main === true) {
            setMain(false);
        } else {
            setMain(true)
        }
    }

    return (
        spinner ?
            <Spinner animation="border" />
            :

            <div className="wallet-edit">

                <div className="wallet-edit-header">
                    <h5>Edit Wallet</h5>

                    {editWalletButton === true &&

                        <Button onClick={() => setEditWalletButton(false)}> <AiOutlineClose /> </Button>}
                </div>


                <Form onSubmit={editWallet} method='post' id="wallet-edit-form">
                    <Form.Group id='wallet-edit-form-amount'>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control id="wallet-edit-amount" step=".01" name="amount" defaultValue={amount} type="number" onChange={(e) => setAmount(e.target.value)} />
                    </Form.Group>

                    {main === true &&
                        ['checkbox'].map((type) => (
                            <div key={`default-${type}`} className="mb-3">
                                <Form.Check
                                    type={type}
                                    id="wallet-edit-main"
                                    label={"Wallet Main"}
                                    defaultChecked={main}
                                    onChange={(e) => handleEditMainWallet(e)}
                                    disabled
                                />
                            </div>
                        ))
                    }

                    {main === false &&
                        ['checkbox'].map((type) => (
                            <div key={`default-${type}`} className="mb-3">
                                <Form.Check
                                    type={type}
                                    id="wallet-edit-main"
                                    label={"Wallet Main"}
                                    defaultChecked={main}
                                    onChange={(e) => handleEditMainWallet(e)}
                                />
                            </div>
                        ))
                    }

                    <Button variant="success" type="submit">
                        Save
                    </Button>
                </Form>
            </div>
    );
};

export default WalletEdit;