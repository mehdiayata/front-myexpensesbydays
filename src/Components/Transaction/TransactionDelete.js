import { Alert, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import transactionService from '../../Services/transaction.service';

const TransactionDelete = (props) => {
    const { idTransactionDelete } = props;
    const { setOnSubmitDelete} = props;
    const {handleDeleteButton} = props;

    const [alertTransaction, setAlertTransaction] = useState(true);


    const handleValidDeleteButton = (valid) => {
        handleDeleteButton(false);

        setAlertTransaction(false);
        
        if(valid == true) {
            transactionService.deleteTransaction(idTransactionDelete).then((resp) => {
                setOnSubmitDelete(true);
            })
        }
    }

    if (alertTransaction == true) {
        return (
            <div className="transaction-delete">
                <Alert variant="danger">
                    <p>
                        Do you confirm delete your transaction ?
                        (Your amount wallet, ...)
                </p>

                    <Button onClick={(e) => handleValidDeleteButton(true)}> Yes </Button>
                    <Button onClick={(e) => handleValidDeleteButton(false)}> No </Button>
                </Alert>


            </div>
        )
    } else {
        return (
            <div className="transaction-delete" >


            </div >
        )
    }


};

export default TransactionDelete;