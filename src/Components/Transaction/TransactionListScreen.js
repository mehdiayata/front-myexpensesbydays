import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import walletService from '../../Services/wallet.service';

const TransactionListScreen = (props) => {
    const { walletSelected } = props;
    const { onSubmit } = props;
    const { setEditTransactionButton } = props;
    const { setIdTransactionEdit } = props;
    const { setDeleteTransactionButton } = props;
    const { setIdTransactionDelete } = props;
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (walletSelected !== null) {
            walletService.getWalletTransactions(walletSelected).then((resp) => {
                setTransactions(resp.data['hydra:member']);
            });
        }
    }, [walletSelected, onSubmit])


    return (
        <div className="transaction-list-screen">
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Amount</th>
                        <th>Created At</th>
                        <th>Edited At</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map((transaction) => {
                            return (
                                <tr key={transaction.id}>
                                    <td>{transaction.id}</td>
                                    <td>{transaction.amount}</td>

                                    <td>{transaction.createdAt != null && moment(transaction.createdAt).format('DD/MM/YYYY')}</td>
                                    <td>{transaction.editAt != null && moment(transaction.editAt).format('DD/MM/YYYY')}</td>


                                    <td><Button onClick={() => { setEditTransactionButton(true); setIdTransactionEdit(transaction.id); setDeleteTransactionButton(false) }} className="transaction-list-screen-edit-button"> Edit</Button></td>
                                    <td><Button onClick={() => { setDeleteTransactionButton(true); setIdTransactionDelete(transaction.id); setEditTransactionButton(false) }} className="transaction-list-screen-delete-button"> Delete </Button></td>
                                </tr>
                            )
                    })}

                </tbody>
            </Table>
        </div >
    );
};

export default TransactionListScreen;