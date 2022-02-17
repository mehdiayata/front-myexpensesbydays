import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { GiTrashCan } from 'react-icons/gi';
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

    const [addTransactionButton, setAddTransactionButton] = useState(false);
    const [editTransactionButton, setEditTransactionButton] = useState(false);
    const [deleteTransactionButton, setDeleteTransactionButton] = useState(false);

    const [idTransactionEdit, setIdTransactionEdit] = useState(null);
    const [idTransactionDelete, setIdTransactionDelete] = useState(null);

    const [quitAdd, setquitAdd] = useState(false);
    const [quitEdit, setquitEdit] = useState(false);

    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setOnSubmitAdd(false);
        setOnSubmitEdit(false);
        setOnSubmitDelete(false);

        if (walletSelected == null) {
            setWalletSelected(localStorage.getItem('current_wallet'));
        }

        if (transactions == []) {
            setIsLoading(true);
        }

        // Get transactions du Wallet user
        if (walletSelected != null) {
            walletService.getWalletTransactions(walletSelected).then((resp) => {
                setTransactions(resp.data['hydra:member']);
                setIsLoading(false);
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

    if (isLoading == false) {
        return (
            <div className="transaction">
                <div className="transaction-list-header">
                    <SelectWalletForm setWalletSelected={setWalletSelected} />

                    {addTransactionButton == false &&
                        <Button onClick={(e) => handleAddButton()}> Add </Button>
                    }

                    {quitAdd == true &&
                        <Button onClick={(e) => handleQuitAddButton(e)}> Close Add </Button>
                    }


                    {quitEdit == true &&
                        <Button onClick={(e) => handleQuitEditButton(e)}> Close Edit </Button>
                    }

                </div>

                <div className="transaction-list">

                    {addTransactionButton == true &&
                        <TransactionAdd walletSelected={walletSelected} setOnSubmitAdd={setOnSubmitAdd} />
                    }

                    {editTransactionButton == true &&
                        <TransactionEdit walletSelected={walletSelected} idTransactionEdit={idTransactionEdit} setOnSubmitEdit={setOnSubmitEdit} />
                    }


                    {deleteTransactionButton == true &&
                        <TransactionDelete idTransactionDelete={idTransactionDelete} setOnSubmitDelete={setOnSubmitDelete} handleDeleteButton={handleDeleteButton} />
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
                                            <td><Button className="transaction-list-edit-button" disabled onClick={(e) => { handleEditButton(e); setIdTransactionEdit(transaction.id) }} > Edit</Button></td>
                                        }
                                        {editTransactionButton == false &&
                                            <td><Button className="transaction-list-edit-button" onClick={(e) => { handleEditButton(e); setIdTransactionEdit(transaction.id) }} > Edit</Button></td>

                                        }


                                        {deleteTransactionButton == true &&

                                            <td><Button disabled className="transaction-list-delete-button" onClick={(e) => { handleDeleteButton(e); setIdTransactionDelete(transaction.id) }}> <GiTrashCan /> </Button></td>

                                        }

                                        {deleteTransactionButton == false &&

                                            <td><Button className="transaction-list-delete-button" onClick={(e) => { handleDeleteButton(e); setIdTransactionDelete(transaction.id) }}> <GiTrashCan /> </Button></td>
                                        }
                                    </tr>
                                )
                            })}


                        </tbody>
                    </Table>
                </div>

            </div>
        );
    } else {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden"></span>
            </Spinner>
        );
    }
};

export default TransactionList;