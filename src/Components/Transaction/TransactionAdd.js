import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import transactionService from '../../Services/transaction.service';

const TransactionAdd = (props) => {
    const { walletSelected } = props;
    const { setOnSubmitAdd } = props;
    const [amount, setAmount] = useState(132);
    const [amountNegative, setAmountNegative] = useState(false);

    const handlePosiNega = () => {
        if (amountNegative == true) {
            setAmountNegative(false);
            setAmount(Math.abs(amount))
        } else {
            setAmountNegative(true);
            setAmount(-Math.abs(amount))
        }

    }

    // Post amount 
    const addTransaction = (e) => {
        e.preventDefault();
        transactionService.postTransactions(amount, walletSelected).then((resp) => {

            setOnSubmitAdd(true);

            document.querySelector('#transaction-add-form').reset();

            setAmount(null);
        })
    }

    return (
        <div className="transaction-add">
            <Form onSubmit={(e) => addTransaction(e)} id="transaction-add-form">
                <Form.Group>
                    <Form.Label>Positive / Négative</Form.Label>
                    <Form.Check type="switch" id="transaction-add-positive-negative" onChange={(e) => { handlePosiNega(e) }} />
                </Form.Group>

                <Form.Group>
                    <Form.Label> Amount </Form.Label>
                    <Form.Control type="number" id="transaction-add-amount"  onChange={(e) => { setAmount(e.target.value) }} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default TransactionAdd;