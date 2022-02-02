import React from 'react';
import Navigation from '../Components/Navigation/Navigation';
import WalletList from '../Components/Wallet/WalletList';

const WalletPage = () => {
    return (
        <div className="walletPage">
            <Navigation />
            <WalletList />
        </div>
    );
};

export default WalletPage;