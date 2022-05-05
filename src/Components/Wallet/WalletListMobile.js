import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { AiFillHeart, AiOutlineClose } from 'react-icons/ai';
import walletService from '../../Services/wallet.service';

const WalletListMobile = (props) => {

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
        <div className="wallet-list-mobile">
            {wallets.map((wallet) => {
                return (

                    <div className="table-mobile">
                        <div className="thead-mobile">
                            <div className="tr-mobile">
                                <div className="th-mobile"> #</div>
                                <div className="th-mobile">Amount </div>
                                <div className="th-mobile">Main </div>
                                <div className="th-mobile"> Created At</div>
                                <div className="th-mobile"> Edited At </div>
                                <div className="th-mobile"> Edit</div>
                                <div className="th-mobile"> Delete</div>
                            </div>
                        </div>


                        <div className="tbody-mobile">

                            <div className="tr-mobile">
                                <div className="td-mobile"> {wallet.id}</div>
                                <div className="td-mobile">{wallet.amount}</div>
                                <div className="td-mobile">{ wallet.main ? <AiFillHeart /> : <AiOutlineClose /> }</div>
                               
                                <div className="td-mobile"> {wallet.createdAt != null && moment(wallet.createdAt).format('DD/MM/YYYY')}</div>
                                <div className="td-mobile"> {wallet.editAt != null && moment(wallet.editAt).format('DD/MM/YYYY')} </div>
                                <div className="td-mobile">
                                    <Button onClick={() => { setEditWalletButton(true); setIdWalletEdit(wallet.id); setDeleteWalletButton(false) }}>Edit</Button></div>
                                <div className="td-mobile">
                                    <Button onClick={() => { setDeleteWalletButton(true); setIdWalletDelete(wallet.id); setEditWalletButton(false) }}>Delete </Button>
                                </div>
                            </div>
                        </div>

                    </div>

                )

            })}


        </div>
    );
};

export default WalletListMobile;