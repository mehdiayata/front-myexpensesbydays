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
    const [editTransactionButton, setEditTransactionButton] = useState(false);
    const [deleteTransactionButton, setDeleteTransactionButton] = useState();

    const [idTransactionEdit, setIdTransactionEdit] = useState(null);
    const [idTransactionDelete, setIdTransactionDelete] = useState(null);

    const [quitAdd, setquitAdd] = useState(false);
    const [quitEdit, setquitEdit] = useState(false);

    useEffect(() => {
        setOnSubmitAdd(false);
        setOnSubmitEdit(false);
        setOnSubmitDelete(false);

        if (walletSelected == null) {
            setWalletSelected(localStorage.getItem('current_wallet'));
        }
        // Get transactions du Wallet user
        if (walletSelected != null) {
            walletService.getWalletTransactions(walletSelected).then((resp) => {
                setTransactions(resp.data['hydra:member']);
            });
        }

    }, [walletSelected, onSubmitAdd, onSubmitEdit, onSubmitDelete])


    const handleAddButton = (e) => {

        setquitAdd(true);
        if (addTransactionButton == true) {
            setAddTransactionButton(false);
        } else {
            setAddTransactionButton(true);
        }
    };

    const handleEditButton = (e) => {

        setquitEdit(true);
        setEditTransactionButton(true);
    };

    const handleDeleteButton = (e) => {
        if (deleteTransactionButton == true) {
            setDeleteTransactionButton(false);
        } else {
            setDeleteTransactionButton(true);
        }
    };

    const handleQuitAddButton = (e) => {
        if (quitAdd == true) {
            setquitAdd(false);
            setAddTransactionButton(false);
        } else {
            setquitAdd(true);
        }
    }

    const handleQuitEditButton = (e) => {
        if (quitEdit == true) {
            setquitEdit(false);
            setEditTransactionButton(false);
        } else {
            setquitEdit(true);
        }
    }


    return (
        <div className="transaction-list">
            {quitAdd == true &&
                <Button onClick={(e) => handleQuitAddButton(e)}> X </Button>
            }

            {quitEdit == true &&
                <Button onClick={(e) => handleQuitEditButton(e)}> X </Button>
            }

            <SelectWalletForm setWalletSelected={setWalletSelected} />

            {addTransactionButton == true &&
                <TransactionAdd walletSelected={walletSelected} setOnSubmitAdd={setOnSubmitAdd} />
            }

            {editTransactionButton == true &&
                <TransactionEdit walletSelected={walletSelected} idTransactionEdit={idTransactionEdit} setOnSubmitEdit={setOnSubmitEdit} />
            }


            {deleteTransactionButton == true &&
                <TransactionDelete idTransactionDelete={idTransactionDelete} setOnSubmitDelete={setOnSubmitDelete} handleDeleteButton={handleDeleteButton} />
            }


            {addTransactionButton == false &&
                <Button onClick={(e) => handleAddButton()}> Add </Button>
            }
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

                        return (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.amount}</td>
                                <td>{new Date(transaction.createdAt).toUTCString()}</td>
                                <td>{transaction.editAt != null && new Date(transaction.editAt).toUTCString()}</td>

                                {editTransactionButton == true &&
                                    <td><Button disabled onClick={(e) => { handleEditButton(e); setIdTransactionEdit(transaction.id) }} > Edit</Button></td>
                                }
                                {editTransactionButton == false &&
                                    <td><Button  onClick={(e) => { handleEditButton(e); setIdTransactionEdit(transaction.id) }} > Edit</Button></td>
                                
                                }
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