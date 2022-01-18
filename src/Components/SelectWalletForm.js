import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

const SelectWalletForm = (props) => {
     /* Desctructuring permet de ne plus utilser props à chaque fois*/
     const { wallets } = props;

    const handleCurrentWallet = (e) => {
        var currentWallet = '/api/wallets/' + e;
        localStorage.setItem('current_wallet', currentWallet);

    };


    return (
        <div className="selectWalletForm">
            <Form>
                <Form.Group controlId="selectWallet">
                    <Form.Label>Select your wallet</Form.Label>
                    <Form.Control as="select" custom='true' onChange={(e) => handleCurrentWallet(e.target.value)}>
                        {wallets.map((wallet) => (
                            <option key={wallet.id} value={wallet['id']}>{wallet.id} </option>
                        ))}

                    </Form.Control>
                </Form.Group>
            </Form>

        </div>
    );
};

export default SelectWalletForm;