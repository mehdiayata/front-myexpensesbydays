import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import walletService from '../../Services/wallet.service';

const SavingForm = () => {
    const [amount, setAmount] = useState();

    const addSaving = (e) => {
        e.preventDefault();

        if (localStorage.getItem('current_wallet')) {
            walletService.putSavingWallet(localStorage.getItem('current_wallet'), amount);
        } else {
            console.log('you are not connected');
        }
    }
    return (
        <div className="saving-form">
            <Form onSubmit={(e) => addSaving(e)}>
                <Form.Group className="saving-add-form-amount">
                    <Form.Label> Saving </Form.Label>
                    <Form.Control type="number" step=".01" defaultValue={0} id="saving-add-amount" onChange={(e) => { setAmount(e.target.value) }} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default SavingForm;