import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { AiFillHeart, AiOutlineClose } from 'react-icons/ai';
import walletService from '../../Services/wallet.service';

const WalletListScreen = (props) => {
    const { setEditWalletButton } = props;
    const { setDeleteWalletButton } = props;
    const { setIdWalletDelete } = props;
    const { setIdWalletEdit } = props;
    const { onSubmit } = props;
    const [wallets, setWallets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        // GET Wallets
        walletService.getWallets().then((resp) => {
            setWallets(resp.data['hydra:member']);
            setIsLoading(false);
        });

    }, [onSubmit])

    if (isLoading === false) {
        return (
            <div className="wallet-list-screen">
                <div className="wallet-title-item">
                    <p>Title</p>
                    <p> Main ?</p>
                    <p>Amount</p>
                </div>

                {wallets.map((wallet) => {
                    return (
                        <div className="wallet-container">
                            <div className="wallet-item" key={wallet.id}>
                                <p className="wallet-title">{wallet.id}</p>
                                <p className='wallet-main'> {wallet.main ? <AiFillHeart /> : <AiOutlineClose />}</p>
                                <p className='wallet-amount'>{wallet.amount}</p>

                            </div>
                            <div className="wallet-button">
                                <Button variant='info' onClick={() => { setEditWalletButton(true); setIdWalletEdit(wallet.id); setDeleteWalletButton(false) }}>Edit</Button>

                                <Button variant='danger' onClick={() => { setDeleteWalletButton(true); setIdWalletDelete(wallet.id); setEditWalletButton(false) }}>Delete </Button>
                            </div>
                        </div>

                    )
                })}

            </div>


        );
    } else {
        return (
            <Spinner className='spinner' animation="border" role="status">
            </Spinner>
        )
    }
};

export default WalletListScreen;