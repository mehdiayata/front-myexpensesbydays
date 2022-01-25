import React, { useEffect, useState } from 'react';
import { Form, Table, Button } from 'react-bootstrap';
import walletService from '../../Services/wallet.service';
import SelectWalletForm from '../Wallet/SelectWalletForm';
import TransactionAdd from './TransactionAdd';
import TransactionDelete from './TransactionDelete';
import TransactionEdit from './TransactionEdit';

const TransactionList = () => {
    const [walletSelected, setWalletSelected] = useState();
    const [transactions, setTransactions] = useState([]);

    const [onSubmitAdd, setOnSubmitAdd] = useState();
    const [onSubmitEdit, setOnSubmitEdit] = useState();
    const [onSubmitDelete, setOnSubmitDelete] = useState();

    const [addTransactionButton, setAddTransactionButton] = useState();
    const [editTransactionButton, setEditTransactionButton] = useState();
    const [deleteTransactionButton, setDeleteTransactionButton] = useState();

    const [idTransactionEdit, setIdTransactionEdit] = useState(null);
    const [idTransactionDelete, setIdTransactionDelete] = useState(null);

    useEffect(() => {
        setOnSubmitAdd(false);
        setOnSubmitEdit(false);
        setOnSubmitDelete(false);

        // Get transactions du Wallet user
        if (walletSelected != null) {
            walletService.getWalletTransactions(walletSelected).then((resp) => {
                setTransactions(resp.data.transactions);
            });
        }
    }, [walletSelected, onSubmitAdd, onSubmitEdit, onSubmitDelete])


    const handleAddButton = (e) => {
        if (addTransactionButton == true) {
            setAddTransactionButton(false);
        } else {
            setAddTransactionButton(true);
        }
    };

    const handleEditButton = (e) => {

        if (editTransactionButton == true) {
            setEditTransactionButton(false);
        } else {
            setEditTransactionButton(true);
        }
    };

    
    const handleDeleteButton = (e) => {
        if (deleteTransactionButton == true) {
            setDeleteTransactionButton(false);
        } else {
            setDeleteTransactionButton(true);
        }
    };

    return (
        <div className="transaction-list">

            <SelectWalletForm setWalletSelected={setWalletSelected} />

            {addTransactionButton == true &&
                <TransactionAdd walletSelected={walletSelected} setOnSubmitAdd={setOnSubmitAdd} />
            }

            {editTransactionButton == true &&
                <TransactionEdit walletSelected={walletSelected} idTransactionEdit={idTransactionEdit} setOnSubmitEdit={setOnSubmitEdit} />
            }


            {deleteTransactionButton == true &&
                <TransactionDelete  idTransactionDelete={idTransactionDelete} setOnSubmitDelete={setOnSubmitDelete} handleDeleteButton={handleDeleteButton}/>
            }


            <Button onClick={(e) => handleAddButton()}> Add </Button>
            <Table>
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
                        if (transaction.editAt == null) {
                            transaction.editAt = "No edit";
                        }
                        return (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.createdAt}</td>
                                <td>{transaction.editAt}</td>
                                <td><Button onClick={(e) => { handleEditButton(e); setIdTransactionEdit(transaction.id) }} > Edit</Button></td>
                                <td><Button onClick={(e) => { handleDeleteButton(e); setIdTransactionDelete(transaction.id) }}> Delete</Button></td>

                            </tr>
                        )
                    })}

                </tbody>
            </Table>

        </div>
    );
};

export default TransactionList;