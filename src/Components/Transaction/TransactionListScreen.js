import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import walletService from '../../Services/wallet.service';

const TransactionListScreen = (props) => {
    const { walletSelected } = props;
    const { onSubmit } = props;
    const { setEditTransactionButton } = props;
    const { setIdTransactionEdit } = props;
    const { setDeleteTransactionButton } = props;
    const { setIdTransactionDelete } = props;
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        if (walletSelected !== null) {
            walletService.getWalletTransactions(walletSelected).then((resp) => {
                setTransactions(resp.data['hydra:member']);
                setIsLoading(false);
            });
        }
    }, [walletSelected, onSubmit])


    if (isLoading === false) {
        return (
            <div className="transaction-list-screen">
                <div className="transaction-title-item">
                    <p>Title</p>
                    <p>Amount</p>
                    <p>CreatedAt</p>
                </div>

                {transactions.map((transaction) => {
                    return (
                        <div className='transaction-container'>
                            <div className='transaction-item' key={transaction.id}>
                                <p>{transaction.id}</p>
                                <p>{transaction.amount}</p>

                                <p>{transaction.createdAt != null && moment(transaction.createdAt).format('DD/MM/YYYY')}</p>
                            </div>

                            <div className="transaction-button">
                                <Button variant='info' onClick={() => { setEditTransactionButton(true); setIdTransactionEdit(transaction.id); setDeleteTransactionButton(false) }} className="transaction-list-screen-edit-button"> Edit</Button>
                                <Button variant='danger' onClick={() => { setDeleteTransactionButton(true); setIdTransactionDelete(transaction.id); setEditTransactionButton(false) }} className="transaction-list-screen-delete-button"> Delete </Button>
                            </div>
                        </div>
                    )
                })}

            </div >
        );
    } else {
        return (

            <Spinner className='spinner' animation="border" role="status">
            </Spinner>
        )
        
    }
};

export default TransactionListScreen;