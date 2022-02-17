import React, { useEffect, useState } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import walletService from '../../Services/wallet.service';
import WalletAdd from './WalletAdd';
import WalletDelete from './WalletDelete';
import WalletEdit from './WalletEdit';
import { GiTrashCan } from 'react-icons/gi';


const WalletList = () => {
    const [wallets, setWallets] = useState([]);

    const [addWalletButton, setAddWalletButton] = useState(false);
    const [editWalletButton, setEditWalletButton] = useState(false);
    const [deleteWalletButton, setDeleteWalletButton] = useState(false);


    const [onSubmitWalletEdit, setOnSubmitWalletEdit] = useState(true);
    const [onSubmitWalletDelete, setOnSubmitWalletDelete] = useState(false);
    const [onSubmitWalletAdd, setOnSubmitWalletAdd] = useState(false);

    const [idWalletEdit, setIdWalletEdit] = useState();
    const [idWalletDelete, setIdWalletDelete] = useState();

    const [quitAdd, setquitAdd] = useState(false);
    const [quitEdit, setquitEdit] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Initialisalisation à false;
        setOnSubmitWalletDelete(false);
        setOnSubmitWalletEdit(false);
        setOnSubmitWalletAdd(false);

        setIsLoading(true);

        // GET Wallets
        walletService.getWallets().then((resp) => {
            setWallets(resp.data['hydra:member']);
            setIsLoading(false);
        });

    }, [onSubmitWalletEdit, onSubmitWalletDelete, onSubmitWalletAdd])

    const handleAddButton = (e) => {
        setquitAdd(true);
        if (addWalletButton == true) {
            setAddWalletButton(false);
        } else {
            setAddWalletButton(true);
        }
    };

    const handleEditButton = (e) => {
        setIdWalletEdit(e);
        setquitEdit(true);

        setEditWalletButton(true);
    }

    const handleDeleteButton = (e) => {
        if (deleteWalletButton == true) {
            setDeleteWalletButton(false);
        } else {
            setDeleteWalletButton(true);
        }
    }

    const handleQuitAddButton = (e) => {
        if (quitAdd == true) {
            setquitAdd(false);
            setAddWalletButton(false);
        } else {
            setquitAdd(true);
        }
    }

    const handleQuitEditButton = (e) => {
        if (quitEdit == true) {
            setquitEdit(false);
            setEditWalletButton(false);
        } else {
            setquitEdit(true);
        }
    }

    if (isLoading == false) {
        return (
            <div className="wallet">
                <div className="wallet-list-header">
                    {quitAdd == true &&
                        <Button onClick={(e) => handleQuitAddButton(e)}> Close Add </Button>
                    }

                    {quitEdit == true &&
                        <Button onClick={(e) => handleQuitEditButton(e)}> Close Edit </Button>
                    }

                    {addWalletButton == false &&
                        <Button onClick={(e) => handleAddButton(e.target.value)}> Add </Button>
                    }
                </div>
                <div className="wallet-list">

                    {addWalletButton == true &&
                        <WalletAdd setOnSubmitWalletAdd={setOnSubmitWalletAdd} />
                    }


                    {editWalletButton === true &&
                        <WalletEdit idWalletEdit={idWalletEdit} setOnSubmitWalletEdit={setOnSubmitWalletEdit} />
                    }

                    {deleteWalletButton == true &&
                        <WalletDelete idWalletDelete={idWalletDelete} wallets={wallets} handleDeleteButton={handleDeleteButton} setOnSubmitWalletDelete={setOnSubmitWalletDelete} />
                    }

                    <Table>
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
                                if (wallet.main == true) {
                                    var test = 'OK'
                                } else if (wallet.main == false) {
                                    var test = 'NO'
                                }

                                return (
                                    <tr key={wallet.id}>
                                        <td>{wallet.id}</td>
                                        <td>{wallet.amount}</td>
                                        <td>{test}</td>
                                        <td>{new Date(wallet.createdAt).toUTCString()}</td>
                                        <td>{wallet.editAt != null && new Date(wallet.editAt).toUTCString()}</td>

                                        {editWalletButton == true &&

                                            <td><Button className="wallet-list-edit-button" disabled onClick={(e) => { handleEditButton(e.target.value) }} value={wallet.id}>Edit</Button></td>
                                        }

                                        {editWalletButton == false &&

                                            <td><Button className="wallet-list-edit-button" onClick={(e) => { handleEditButton(e.target.value) }} value={wallet.id}>Edit</Button></td>
                                        }

                                        {deleteWalletButton == true &&

                                            <td><Button className="wallet-list-delete-button" disabled onClick={(e) => { handleDeleteButton(e.target.value); setIdWalletDelete(e.target.value); }} value={wallet.id}><GiTrashCan /></Button></td>
                                        }

                                        {deleteWalletButton == false &&

                                            <td><Button className="wallet-list-delete-button" onClick={(e) => { handleDeleteButton(e.target.value); setIdWalletDelete(e.target.value); }} value={wallet.id}><GiTrashCan /></Button></td>
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

export default WalletList;