import React, { useEffect, useState } from 'react';
import { Form, Table, Button } from 'react-bootstrap';
import walletService from '../../Services/wallet.service';
import SelectWalletForm from '../SelectWalletForm';
import TransactionAdd from './TransactionAdd';

const TransactionList = () => {
    const [walletSelected, setWalletSelected] = useState();
    const [transactions, setTransactions] = useState([]);
    const [onSubmitAdd, setOnSubmitAdd] = useState();

    const [addTransactionButton, setAddTransactionButton] = useState();

    useEffect(() => {
        setOnSubmitAdd(false);
        if (walletSelected != null) {
            walletService.getWalletTransactions(walletSelected).then((resp) => {
                setTransactions(resp.data.transactions);
            });
        }
    }, [walletSelected, onSubmitAdd])


    const handleAddButton = (e) => {
        if (addTransactionButton == true) {
            setAddTransactionButton(false);
        } else {
            setAddTransactionButton(true);
        }
    };

    return (
        <div className="transaction-list">
            
            <SelectWalletForm setWalletSelected={setWalletSelected} />

            {addTransactionButton == true && 
                <TransactionAdd walletSelected={walletSelected} setOnSubmitAdd={setOnSubmitAdd}/>
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
                                <td><Button> Edit</Button></td>
                                <td><Button> Delete</Button></td>

                            </tr>
                        )
                    })}

                </tbody>
            </Table>

        </div>
    );
};

export default TransactionList;