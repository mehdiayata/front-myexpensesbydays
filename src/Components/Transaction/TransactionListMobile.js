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
        walletService.getWalletTransactions(walletSelected).then((resp) => {
            setTransactions(resp.data['hydra:member']);
        });
    }, [walletSelected, onSubmit])


    return (
        <div className="transaction-list-mobile">

            {transactions.map((transaction) => {
                return (

                    <div className="table-mobile">
                        <div className="thead-mobile">
                            <div className="tr-mobile">
                                <div className="th-mobile"> #</div>
                                <div className="th-mobile">Amount </div>
                                <div className="th-mobile"> Created At</div>
                                <div className="th-mobile"> Edited At </div>
                                <div className="th-mobile"> Edit</div>
                                <div className="th-mobile"> Delete</div>
                            </div>
                        </div>


                        <div className="tbody-mobile">

                            <div className="tr-mobile">
                                <div className="td-mobile"> {transaction.id}</div>
                                <div className="td-mobile">{transaction.amount}</div>
                                <div className="td-mobile"> {transaction.createdAt != null && moment(transaction.createdAt).format('DD/MM/YYYY')}</div>
                                <div className="td-mobile"> {transaction.editAt != null && moment(transaction.editAt).format('DD/MM/YYYY')} </div>
                                <div className="td-mobile">
                                    <Button onClick={() => { setEditTransactionButton(true); setIdTransactionEdit(transaction.id); setDeleteTransactionButton(false) }} className="transaction-list-screen-edit-button"> Edit</Button></div>
                                <div className="td-mobile">

                                    <Button onClick={() => { setDeleteTransactionButton(true); setIdTransactionDelete(transaction.id); setEditTransactionButton(false) }} className="transaction-list-screen-delete-button"> Delete </Button>
                                </div>
                            </div>
                        </div>

                    </div>

                )



            })}

        </div >
    );
};

export default TransactionListScreen;