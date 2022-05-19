import React, { useState, useEffect } from 'react';
import Budget from './Budget';

const Coast = () => {
    const [walletSelected, setWalletSelected] = useState(null);
    const [coast, setCoast] = useState(true);
    

    useEffect(() => {
        // GET wallet if not null
        if (walletSelected === null) {
            setWalletSelected(localStorage.getItem('current_wallet'));
        } else {
            alert('Erreur, aucun wallet par défaut est défini');
        }
    }, []);

    return (
        <div className="coast">
            <Budget walletSelected={walletSelected} coast={coast} />
        </div>
    );
};

export default Coast;