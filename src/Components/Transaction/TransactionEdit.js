import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import transactionService from '../../Services/transaction.service';
import { AiOutlineClose } from 'react-icons/ai';


const TransactionEdit = (props) => {
    const { idTransactionEdit } = props;
    const { setOnSubmitEdit } = props;
    const { editTransactionButton } = props;
    const { setEditTransactionButton } = props;
    const { setSpinner} = props;
    const [amount, setAmount] = useState('');

    useEffect(() => {
        // GET Transaction pour afficher l'amount à éditer
        transactionService.getTransaction(idTransactionEdit).then((resp) => {
            setAmount(resp.data.amount);

        })
    }, [idTransactionEdit])


    const editTransaction = (e) => {
        
        setSpinner(true);
    
        e.preventDefault();
        transactionService.putTransaction(amount, idTransactionEdit).then((resp) => {
            setOnSubmitEdit(true);
            setSpinner(false);
        })
    }

    return (
        <div className="transaction-edit">
            <div className="transaction-edit-header">
                <h5> Transaction Edit</h5>

                {editTransactionButton === true && <Button onClick={() => setEditTransactionButton(false)}> <AiOutlineClose />  </Button>}
            </div>
            <Form onSubmit={(e) => { editTransaction(e) }} id="transaction-edit-form">

                <Form.Group className="transaction-edit-form-amount">
                    <Form.Label> Amount </Form.Label>
                    <Form.Control type="number" id="transaction-edit-amount" defaultValue={amount} onChange={(e) => { setAmount(e.target.value) }} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default TransactionEdit;