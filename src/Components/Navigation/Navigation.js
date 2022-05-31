import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineDisconnect, AiOutlineDollarCircle, AiOutlineHome, AiOutlineWallet } from 'react-icons/ai';


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

            <Nav className="flex-column" defaultActiveKey="/home" variant="pills">

                <NavLink to='/home' exact='true' activeclassname="nav-active"
                    style={({ isActive }) => ({
                        background: isActive ? '#efefef' : 'black',
                        color: isActive ? 'black' : 'white',
                    })}>
                    <AiOutlineHome />
                    <p> Home </p>
                </NavLink>
                        
                <NavLink to='/transactions' exact='true' activeclassname="nav-active" style={({ isActive }) => ({

                    background: isActive ? '#FFFFFF' : 'black',
                    color: isActive ? 'black' : 'white',
                })}>
                    <AiOutlineDollarCircle />
                    <p> Transactions </p>
                </NavLink>

                <NavLink to='/wallets'  exact='true' activeclassname="nav-active" style={({ isActive }) => ({

                    background: isActive ? '#FFFFFF' : 'black',
                    color: isActive ? 'black' : 'white',
                })}>
                    <AiOutlineWallet />
                    <p> Wallet </p>
                </NavLink>

                <NavLink to='/budget'  exact='true' activeclassname="nav-active" style={({ isActive }) => ({

                    background: isActive ? '#FFFFFF' : 'black',
                    color: isActive ? 'black' : 'white',
                })}>
                    <AiOutlineWallet />
                    <p> Budget </p>
                </NavLink>

                
                <Button className="button-disconnect" onClick={(e) => handleDisconnect()} >
                    <AiOutlineDisconnect />
                    <p> Disconnect </p>
                </Button>
            </Nav>


        </div>
    );
};

export default Navigation;