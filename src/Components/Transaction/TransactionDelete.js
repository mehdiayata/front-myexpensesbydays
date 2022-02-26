import { Alert, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import transactionService from '../../Services/transaction.service';

const TransactionDelete = (props) => {
    const { idTransactionDelete } = props;
    const { setOnSubmitDelete } = props;
    const { setDeleteTransactionButton } = props;


    const handleValidDeleteButton = (valid) => {

        // Permet de fermer l'alerte
        setDeleteTransactionButton(false);

        if (valid == true) {
            transactionService.deleteTransaction(idTransactionDelete).then((resp) => {
                setOnSubmitDelete(true);
            })
        }
    }

    return (
        <div className="transaction-delete">
            <Alert variant="danger">
                <p>
                    Do you confirm delete your transaction ? <br />
                    (Your amount wallet will be recalculed)
                    </p>

                <Button variant="danger" onClick={(e) => handleValidDeleteButton(true)}> Yes </Button>
                <Button variant="secondary" onClick={(e) => handleValidDeleteButton(false)}> No </Button>
            </Alert>


        </div>
    )
};

export default TransactionDelete;