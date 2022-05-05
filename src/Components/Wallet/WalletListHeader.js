import React from 'react';
import { Button } from 'react-bootstrap';

const WalletListHeader = (props) => {
    
    const {addWalletButton} = props;
    const {setAddWalletButton} = props;
    return (
        <div className="wallet-list-header">
            
            {addWalletButton === false && <Button onClick={() => setAddWalletButton(true)}> Add </Button>}
            
        </div>
    );
};

export default WalletListHeader;