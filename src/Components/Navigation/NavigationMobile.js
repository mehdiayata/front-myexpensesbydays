import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineDollarCircle, AiOutlineWallet, AiOutlineHome, AiOutlineDisconnect } from 'react-icons/ai';
import { BsFileBarGraph } from 'react-icons/bs';


const NavigationMobile = () => {

    const navigate = useNavigate();

    const handleDisconnect = () => {

        localStorage.clear();
        navigate('/login');
    }

    const displayDisconect = () => {
        if (localStorage.getItem('JWT') !== null) {
            return (
                <Button className="button-disconnect" onClick={(e) => handleDisconnect()} >
                    <AiOutlineDisconnect />
                </Button>
            )
        } else {
            return (
                <Button className="button-disconnect" disabled onClick={(e) => handleDisconnect()} >
                    <AiOutlineDisconnect />
                </Button>
            )

        }
    }

    return (
        <div className="navigation-mobile">
            <Nav className="flex-row">


                <NavLink to='/home' exact='true' activeclassname="nav-active">
                    <AiOutlineHome />
                </NavLink>

                <NavLink to='/transactions' exact='true' activeclassname="nav-active">
                    <AiOutlineDollarCircle />
                </NavLink>

                <NavLink to='/wallets' exact='true' activeclassname="nav-active">
                    <AiOutlineWallet />
                </NavLink>


                <NavLink to='/budget' exact='true' activeclassname="nav-active">
                    <BsFileBarGraph />
                </NavLink>

                {displayDisconect()}

            </Nav>
        </div>
    );
};

export default NavigationMobile;