import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import walletService from '../../Services/wallet.service';

const WalletEdit = (props) => {
    const { idWalletEdit } = props;
    const { setOnSubmitWalletEdit } = props;
    const { handleOnSubmitWalletEdit } = props;
    const [walletInfo, setWalletInfo] = useState();
    const [amount, setAmount] = useState();
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
                walletService.putMainWallet(idWalletEdit).then(
                    localStorage.setItem('current_wallet', idWalletEdit)
                );
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
        <div className="wallet-edit">
            <h5> Wallet Edit </h5>

            <Form onSubmit={editWallet} method='post' id="wallet-edit-form">
                <Form.Group id='wallet-edit-form-amount'>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control id="wallet-edit-amount"  name="amount" defaultValue={amount} type="number" onChange={(e) => setAmount(e.target.value)} />
                </Form.Group>

                {main == true &&
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

                {main == false &&
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

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default WalletEdit;