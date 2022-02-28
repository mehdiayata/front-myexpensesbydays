import React, { useEffect, useState } from 'react';
import WalletAdd from './WalletAdd';
import WalletDelete from './WalletDelete';
import WalletEdit from './WalletEdit';
import WalletListHeader from './WalletListHeader';
import WalletListScreen from './WalletListScreen';
import WalletListMobile from './WalletListMobile';

const Wallet = () => {
    const [addWalletButton, setAddWalletButton] = useState(false);
    const [editWalletButton, setEditWalletButton] = useState(false);
    const [deleteWalletButton, setDeleteWalletButton] = useState(false);
    const [idWalletEdit, setIdWalletEdit] = useState(null);
    const [idWalletDelete, setIdWalletDelete] = useState(null);
    const [onSubmit, setOnSubmit] = useState(false);

    useEffect(() => {
        // Initialise onSubmit à false
        setOnSubmit(false);
    })

    return (
        <div className="wallet">

            {/* Header */}
            <WalletListHeader addWalletButton={addWalletButton} setAddWalletButton={setAddWalletButton} />


            {/* Add */}
            {addWalletButton == true &&
                <WalletAdd addWalletButton={addWalletButton} setAddWalletButton={setAddWalletButton} setOnSubmitAdd={setOnSubmit} />
            }

            {editWalletButton == true &&
                <WalletEdit editWalletButton={editWalletButton}
                    setEditWalletButton={setEditWalletButton}
                    idWalletEdit={idWalletEdit}
                    setIdWalletEdit={setIdWalletEdit}
                    setOnSubmitEdit={setOnSubmit}
                />
            }


            {deleteWalletButton == true &&
                <WalletDelete setDeleteWalletButton={setDeleteWalletButton}
                    idWalletDelete={idWalletDelete}
                    setOnSubmitDelete={setOnSubmit}
                />
            }

            {/*List */}
            <WalletListScreen setEditWalletButton={setEditWalletButton}
                deleteWalletButton={deleteWalletButton}
                setDeleteWalletButton={setDeleteWalletButton}
                setIdWalletDelete={setIdWalletDelete}
                setIdWalletEdit={setIdWalletEdit} 
                onSubmit={onSubmit}/>
                
                
            <WalletListMobile setEditWalletButton={setEditWalletButton}
                deleteWalletButton={deleteWalletButton}
                setDeleteWalletButton={setDeleteWalletButton}
                setIdWalletDelete={setIdWalletDelete}
                setIdWalletEdit={setIdWalletEdit} 
                onSubmit={onSubmit}/>

        </div>
    );
};

export default Wallet;