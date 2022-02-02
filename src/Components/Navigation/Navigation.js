import React from 'react';
import { Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

const Navigation = () => {

    const navigate = useNavigate();

    const handleDisconnect = () => {

        localStorage.clear();
        navigate('/login');
    }

    return (
        <div className="navigation">
            <NavLink to='/transactions' exact='true' activeclassname="nav-active">
                Transaction
                </NavLink>

            <NavLink to='/wallets' exact='true' activeclassname="nav-active">
                Wallet
                </NavLink>


            <NavLink to='/password/edit' exact='true' activeclassname="nav-active">
                 User
                </NavLink>


            <Button to='/disconnect' onClick={(e) => handleDisconnect()} >
                 Disconnect
                </Button>


        </div>
    );
};

export default Navigation;