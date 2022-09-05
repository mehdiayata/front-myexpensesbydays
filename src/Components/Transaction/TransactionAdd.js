import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import transactionService from '../../Services/transaction.service';
import { AiOutlineClose } from 'react-icons/ai';
import { Spinner } from 'react-bootstrap';

const TransactionAdd = (props) => {
    const { walletSelected } = props;
    const { setOnSubmitAdd } = props;
    const { addTransactionButton } = props;
    const { setAddTransactionButton } = props;
    const [amount, setAmount] = useState('0');
    const [isLoading, setIsLoading] = useState(false);

    // Post amount 
    const addTransaction = (e) => {
        setIsLoading(true);

        setOnSubmitAdd(true);

        e.preventDefault();
        transactionService.postTransactions(amount, walletSelected).then((resp) => {

            setIsLoading(false);
            setOnSubmitAdd(false);

            document.querySelector('#transaction-add-form').reset();

            setAmount('0');
        })
    }

    const displayForm = () => {
        if (isLoading === true) {
            return (
                <Spinner animation='border' />
            )
        } else {
            return (
                <Form onSubmit={(e) => addTransaction(e)} id="transaction-add-form">

                    <Form.Group className="transaction-add-form-amount">
                        <Form.Label> Amount </Form.Label>
                        <Form.Control type="number" step=".01" defaultValue={amount} id="transaction-add-amount" onChange={(e) => { setAmount(e.target.value) }} />
                    </Form.Group>

                    <Button variant="success" type="submit">
                        Save
                    </Button>
                </Form>
            )

        }
    }

    return (
        <div className="transaction-add">
            <div className="transaction-add-header">
                <h5>Add new transaction</h5>
                {addTransactionButton === true &&

                    <Button onClick={() => setAddTransactionButton(false)}> <AiOutlineClose /> </Button>
                }

            </div>

            {displayForm()}
        </div>
    );
};

export default TransactionAdd;