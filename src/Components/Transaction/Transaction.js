import React, { useEffect, useState } from 'react';
import TransactionListHeader from './TransactionListHeader';
import TransactionListScreen from './TransactionListScreen';
import TransactionListMobile from './TransactionListMobile';
import TransactionAdd from './TransactionAdd';
import TransactionEdit from './TransactionEdit';
import TransactionDelete from './TransactionDelete';
import { Spinner } from 'react-bootstrap';

const Transaction = () => {
    const [walletSelected, setWalletSelected] = useState(null);
    const [addTransactionButton, setAddTransactionButton] = useState(false);
    const [editTransactionButton, setEditTransactionButton] = useState(false);
    const [deleteTransactionButton, setDeleteTransactionButton] = useState(false);
    const [idTransactionEdit, setIdTransactionEdit] = useState(null);
    const [idTransactionDelete, setIdTransactionDelete] = useState(null);
    const [onSubmit, setOnSubmit] = useState(false);
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        // Initialise onSubmit à false
        setOnSubmit(false);

    }, [onSubmit])

    return (
        <div className="transaction">
            <TransactionListHeader setWalletSelected={setWalletSelected}
                walletSelected={walletSelected}
                addTransactionButton={addTransactionButton}
                setAddTransactionButton={setAddTransactionButton}
                onSubmit={onSubmit} />


            {addTransactionButton === true &&
                <TransactionAdd walletSelected={walletSelected} setOnSubmitAdd={setOnSubmit}
                    addTransactionButton={addTransactionButton}
                    setAddTransactionButton={setAddTransactionButton}
                    setSpinner={setSpinner}
                />
            }

            {editTransactionButton === true &&
                <TransactionEdit walletSelected={walletSelected}
                    idTransactionEdit={idTransactionEdit}
                    setOnSubmitEdit={setOnSubmit}
                    editTransactionButton={editTransactionButton}
                    setEditTransactionButton={setEditTransactionButton}
                    setSpinner={setSpinner}
                />
            }

            {deleteTransactionButton === true &&
                <TransactionDelete 
                idTransactionDelete={idTransactionDelete} 
                setOnSubmitDelete={setOnSubmit} 
                setDeleteTransactionButton={setDeleteTransactionButton} 
                setSpinner={setSpinner}/>
            }

            {spinner ?
                <Spinner animation="border" role="status">
                </Spinner>
                :
                <>
                    <TransactionListScreen walletSelected={walletSelected} onSubmit={onSubmit}
                        setEditTransactionButton={setEditTransactionButton}
                        setIdTransactionEdit={setIdTransactionEdit}
                        setDeleteTransactionButton={setDeleteTransactionButton}
                        setIdTransactionDelete={setIdTransactionDelete} />

                </>
            }

        </div>
    );

};

export default Transaction;