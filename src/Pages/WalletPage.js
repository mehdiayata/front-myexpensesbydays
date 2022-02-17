import React from 'react';
import BreadcrumbNav from '../Components/Navigation/BreadcrumbNav';
import Footer from '../Components/Navigation/Footer';
import Navigation from '../Components/Navigation/Navigation';
import WalletList from '../Components/Wallet/WalletList';

const WalletPage = () => {
    return (
        <div className="wallet-page">
            <BreadcrumbNav title={"Wallets"} />
            <WalletList />
        </div>
    );
};

export default WalletPage;