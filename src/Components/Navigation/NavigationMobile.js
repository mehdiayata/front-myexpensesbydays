import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineDisconnect, AiOutlineDollarCircle, AiOutlineUser, AiOutlineWallet } from 'react-icons/ai';
import { GiCash, GiWallet } from 'react-icons/gi'

const NavigationMobile = () => {

    const navigate = useNavigate();

    const handleDisconnect = () => {

        localStorage.clear();
        navigate('/login');
    }

    return (
        <div className="navigation-mobile">
                <Nav className="flex-row">

                    <NavLink to='/transactions' exact='true' activeclassname="nav-active">
                        <AiOutlineDollarCircle />
                    </NavLink>

                    <NavLink to='/wallets' exact='true' activeclassname="nav-active">
                        <AiOutlineWallet />
                    </NavLink>


                    <NavLink to='/password/edit' exact='true' activeclassname="nav-active">
                        <AiOutlineUser />
                    </NavLink>


                    <a to='/disconnect' onClick={(e) => handleDisconnect()} >
                        <AiOutlineDisconnect />
                    </a>
                </Nav>
        </div>
    );
};

export default NavigationMobile;