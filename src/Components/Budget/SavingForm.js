import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import walletService from '../../Services/wallet.service';

const SavingForm = (props) => {
    const [amount, setAmount] = useState();
    const {setOnSubmitSaving} = props;

    const addSaving = (e) => {
        e.preventDefault();

        setOnSubmitSaving(true);
        if (localStorage.getItem('current_wallet')) {
            walletService.putSavingWallet(localStorage.getItem('current_wallet'), amount);
        } else {
            console.log('you are not connected');
        }
    }
    return (
        <div className="budget-preview-calcul">
            
            <p className="text-info-black">How much do you want to save per month ? </p>
            <Form onSubmit={(e) => addSaving(e)} className="saving-form ">
                <Form.Group className="saving-add-form-amount">
                    <Form.Label> Amount</Form.Label>
                    <Form.Control type="number" step=".01" defaultValue={0} id="saving-add-amount" onChange={(e) => { setAmount(e.target.value) }} />
                </Form.Group>
                <Button variant="success" type="submit">
                    Save
                </Button>
            </Form>
        </div>
    );
};

export default SavingForm;