import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import transactionService from '../../Services/transaction.service';

const TransactionEdit = (props) => {
    const {idTransactionEdit} = props;
    const {setOnSubmitEdit} = props;

    const [transaction, setTransaction] = useState();
    const [amountNegative, setAmountNegative] = useState(false);

    const [amount, setAmount] = useState('');

    useEffect(() => {
        transactionService.getTransaction(idTransactionEdit).then((resp) => {
            setTransaction(resp.data);
            setAmount(resp.data.amount);

            if(resp.data.amount > 0) {
                setAmountNegative(false)
            } else {
                setAmountNegative(true)
            }
        })
    }, [])
    

    const handlePosiNega = (e) => {
        if(amountNegative == true) {
            setAmountNegative(false);
            setAmount(Math.abs(amount))
        } else {
            setAmountNegative(true);
            setAmount(-Math.abs(amount))
        }
    }

    const editTransaction = (e) => {
        e.preventDefault();
        transactionService.putTransaction(amount, idTransactionEdit).then((resp) => {
            setOnSubmitEdit(true);
            
            document.querySelector('#transaction-edit-form').reset();

            setAmount(null);
        })
    }


    return (
        <div className="transaction-edit">
            <h5> Transaction Edit</h5>
            <Form onSubmit={(e) => {editTransaction(e)}} id="transaction-edit-form">
            {/* <Form.Group className="transaction-edit-form-positive-negative">
                    <Form.Check type="switch" id="transaction-edit-positive-negative" checked={amountNegative} onChange={(e) => { handlePosiNega(e) }} label="Check if your amount is negative"/>
                </Form.Group> */}

                <Form.Group className="transaction-edit-form-amount">
                    <Form.Label> Amount </Form.Label>
                    <Form.Control type="number" id="transaction-edit-amount"  defaultValue={amount} onChange={(e) => { setAmount(e.target.value) }} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default TransactionEdit;