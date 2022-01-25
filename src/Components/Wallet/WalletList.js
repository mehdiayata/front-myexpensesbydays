import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import walletService from '../../Services/wallet.service';
import WalletAdd from './WalletAdd';
import WalletDelete from './WalletDelete';
import WalletEdit from './WalletEdit';


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


    useEffect(() => {
        // Initialisalisation à false;
        setOnSubmitWalletDelete(false);
        setOnSubmitWalletEdit(false);
        setOnSubmitWalletAdd(false);

        // GET Wallets
        walletService.getWallets().then((resp) => {
            setWallets(resp.data['hydra:member']);
        });

    }, [onSubmitWalletEdit, onSubmitWalletDelete, onSubmitWalletAdd])

    const handleAddButton = (e) => {
        if (addWalletButton == true) {
            setAddWalletButton(false);
        } else {
            setAddWalletButton(true);
        }
    };

    const handleEditButton = (e) => {
        setIdWalletEdit(e);
        if (editWalletButton == true) {
            setEditWalletButton(false);
        } else {
            setEditWalletButton(true);
        }
    }

    const handleDeleteButton = (e) => {
        if(deleteWalletButton == true) {
            setDeleteWalletButton(false);
        } else {
            setDeleteWalletButton(true);
        }
    }

    return (
        <div className="walletList">
            {addWalletButton == true &&
                <WalletAdd  setOnSubmitWalletAdd={setOnSubmitWalletAdd}/>
            }
            <h1> List of your Wallets </h1>


            {editWalletButton == true &&
                <WalletEdit idWalletEdit={idWalletEdit}  setOnSubmitWalletEdit={setOnSubmitWalletEdit} />
            }

            {deleteWalletButton == true &&
                <WalletDelete idWalletDelete={idWalletDelete} wallets={wallets} handleDeleteButton={handleDeleteButton} setOnSubmitWalletDelete={setOnSubmitWalletDelete} />
            }


            <Button onClick={(e) => handleAddButton(e.target.value)}> Add </Button>
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
                        if (wallet.editAt == null) {
                            wallet.editAt = "No edit";
                        }
                        return (
                            <tr key={wallet.id}>
                                <td>{wallet.id}</td>
                                <td>{wallet.amount}</td>
                                <td>{test}</td>
                                <td>{wallet.createdAt}</td>
                                <td>{wallet.editAt}</td>
                                <td><Button onClick={(e) => handleEditButton(e.target.value)} value={wallet.id}>Edit</Button></td>
                                <td><Button onClick={(e) => { handleDeleteButton(e.target.value); setIdWalletDelete(e.target.value) }} value={wallet.id}>Delete</Button></td>

                            </tr>
                        )
                    })}

                </tbody>
            </Table>
        </div>
    );
};

export default WalletList;