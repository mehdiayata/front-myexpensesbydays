import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { AiFillHeart, AiOutlineClose } from 'react-icons/ai';
import walletService from '../../Services/wallet.service';

const WalletListScreen = (props) => {
    const { setEditWalletButton } = props;
    const { setDeleteWalletButton } = props;
    const { setIdWalletDelete } = props;
    const { setIdWalletEdit } = props;
    const { onSubmit } = props;
    const [wallets, setWallets] = useState([]);

    useEffect(() => {
        // GET Wallets
        walletService.getWallets().then((resp) => {
            setWallets(resp.data['hydra:member']);
        });

    }, [onSubmit])

    return (
        <div className="wallet-list-screen">
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Amount</th>
                        <th>Main</th>
                        <th>Created At</th>
                        <th>Edited At</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>

                    {wallets.map((wallet) => {
                        return (
                            <tr key={wallet.id}>

                                <td>{wallet.id}</td>
                                <td>{wallet.amount}</td>
                                <td>{ wallet.main ? <AiFillHeart /> : <AiOutlineClose /> }</td>
                                
                                <td>{wallet.createdAt != null && moment(wallet.createdAt).format('DD/MM/YYYY')}</td>
                                <td>{wallet.editAt != null && moment(wallet.editAt).format('DD/MM/YYYY')}</td>
                                <td><Button onClick={() => { setEditWalletButton(true); setIdWalletEdit(wallet.id); setDeleteWalletButton(false) }}>Edit</Button></td>
                                <td><Button onClick={() => { setDeleteWalletButton(true); setIdWalletDelete(wallet.id); setEditWalletButton(false) }}>Delete </Button></td>
                            </tr>
                        )
                    })}



                </tbody>
            </Table>

        </div>


    );
};

export default WalletListScreen;