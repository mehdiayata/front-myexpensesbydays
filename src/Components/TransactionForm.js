
import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const TransactionForm = () => {

    const [posiNega, setPosiNega] = useState(false);
    const [amount, setAmount] = useState();

    const handleChange = (e) => {
        setPosiNega(!posiNega);


    }

    const handleTransaction = (e) => {
        e.preventDefault();

        // Date now format json 
        let date = new Date();
        //console.log(date.toJSON());

        axios.post('http://127.0.0.1:8000/api/transactions', {
        amount: amount,
        createdAt: date.toJSON(),
        wallet: 3,
        },
        {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('JWT') //the token is a variable which holds the token
            }
        });

        console.log(localStorage.getItem('JWT'));


    }



    return (
        <div className='transactionForm'>
            <Form onSubmit={handleTransaction}>
                <Form.Group>

                    <Form.Check type="switch" id="transaction-positive-negative" onChange={handleChange} />

                </Form.Group>

                <Form.Group>
                    <Form.Control type="number" onChange={(e) => { setAmount(e.target.value) }} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default TransactionForm;