import React from 'react';
import {Button, Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineDisconnect, AiOutlineDollarCircle, AiOutlineUser, AiOutlineWallet } from 'react-icons/ai';


const Navigation = () => {

    const navigate = useNavigate();

    const handleDisconnect = () => {

        localStorage.clear();
        navigate('/login');
    }

    return (
        <div className="navigation">

              <div className="app-title">
                    <h1>mEbD</h1>
                </div>

            <Nav className="flex-column">
              

                <NavLink to='/transactions' exact='true' activeclassname="nav-active">
                    <AiOutlineDollarCircle />
                </NavLink>

                <NavLink to='/wallets' exact='true' activeclassname="nav-active">
                    <AiOutlineWallet />
                </NavLink>


                <NavLink to='/password/edit' exact='true' activeclassname="nav-active">
                    <AiOutlineUser />
                </NavLink>


                <Button onClick={(e) => handleDisconnect()} >
                    <AiOutlineDisconnect />
                </Button>
            </Nav>


        </div>
    );
};

export default Navigation;