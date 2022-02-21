import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import BreadcrumbNav from '../Components/Navigation/BreadcrumbNav';
import Footer from '../Components/Navigation/Footer';
import Navigation from '../Components/Navigation/Navigation';
import WalletList from '../Components/Wallet/WalletList';

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
            <WalletList />
        </div>
    );
};

export default WalletPage;