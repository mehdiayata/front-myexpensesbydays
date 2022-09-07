import React, { useState } from 'react';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import walletService from '../../Services/wallet.service';

const SavingForm = (props) => {
    const [amount, setAmount] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { saving } = props;
    const [isValid, setIsValid] = useState(null);
    const {setOnSubmit} = props;

    const addSaving = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsValid(null);

        if (localStorage.getItem('current_wallet')) {
            walletService.putSavingWallet(localStorage.getItem('current_wallet'), amount).then(() => {
                setIsLoading(false);
                setIsValid(true);
                setOnSubmit(true);
            })
        } else {
            setIsValid(false);
        }
    }

    const displayButton = () => {
        if (isLoading === true) {
            return (
                <Button variant="primary" type="submit" disabled>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    <span className="visually-hidden">Loading...</span>
                </Button>
            )
        } else {
            return (
                <Button variant="primary" type="submit">
                    Save
                </Button>
            )
        }
    }

    const displayAlert = () => {
        if (isValid !== null) {
            if (isValid === true) {
                return (
                    <Alert className="alert" variant="success">
                        <Alert.Heading> Update </Alert.Heading>
                        <p>
                            Your saving is updated.
                        </p>
                    </Alert>
                )
            } else {
                return (
                    <Alert variant="warning">
                        <Alert.Heading> Error </Alert.Heading>
                        <p>
                            An error has occurred, contact the support.
                        </p>
                    </Alert>
                )
            }
        }
    }
    return (
        <div className="budget-preview-calcul">

            <p className="text-info-black">How much do you want to save per month ? </p>
            <Form onSubmit={(e) => addSaving(e)} className="saving-form ">
                <Form.Group className="saving-add-form-amount">
                    <Form.Label> Amount</Form.Label>
                    <Form.Control type="number" step=".01" defaultValue={saving} id="saving-add-amount" onChange={(e) => { setAmount(e.target.value) }} />
                </Form.Group>

                {displayButton()}
            </Form>
            {displayAlert()}
        </div>
    );
};

export default SavingForm;