import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DisplayTransaction from '../Components/DisplayTransaction';
import SelectWalletForm from '../Components/SelectWalletForm';
import TransactionForm from '../Components/TransactionForm';
import walletService from '../Services/wallet.service';

const Transaction = () => {

    return (
        <div>
            <TransactionForm />
        </div>
    );
};


export default Transaction;