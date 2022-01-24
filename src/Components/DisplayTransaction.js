import axios from 'axios';
import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import walletService from '../Services/wallet.service';

const DisplayTransaction = (props) => {
    // Get props
    const { idCurrentWallet } = props;
    const { onSubmit } = props;

    const [transactions, setTransactions] = useState([]);
    

    useEffect(() => {
        // Au premier lancement le props est 'undefined', le if permet d'attendre que le idCurrentWallet soit définit par le parent
        if (idCurrentWallet != undefined) {

           walletService.getWalletTransactions(idCurrentWallet).then((resp) => {
                setTransactions(resp.data.transactions);
            })
        }
    }, [idCurrentWallet, onSubmit]);


    return (
        <div className='displayTransaction'>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Amount</th>
                        <th>CreatedAt</th>
                        <th>Edit At</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map((transaction) => {
                        return (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.createdAt}</td>
                                <td>{transaction.editAt}</td>
                                <td><Button>Edit</Button></td>
                                <td><Button>Delete</Button></td>

                            </tr>
                        )
                    })}

                </tbody>
            </Table>

        </div>
    );
};

export default DisplayTransaction;