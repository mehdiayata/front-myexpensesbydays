import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import BreadcrumbNav from '../Components/Navigation/BreadcrumbNav';
import Wallet from '../Components/Wallet/Wallet';

const WalletPage = () => {
    
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('JWT') == null) {
            navigate('/login');
        }
    })

    return (
        <div className="wallet-page">
            <BreadcrumbNav title={"Wallets"} />
            <Wallet />
        </div>
    );
};

export default WalletPage;