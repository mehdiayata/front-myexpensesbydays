import React from 'react';
import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai';
import { GiCash } from 'react-icons/gi';
import {NavLink} from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer">

            <div className="image-footer">
            <img className="navigation_logo" src={process.env.PUBLIC_URL + "/images/logo.svg"}></img>
             
            </div>

            <div className="contents">
                <ul>
                    <h4>Navigation</h4>
                    <li><NavLink to='/' exact='true'> Home </NavLink></li>
                    <li> <NavLink to='/wallets' exact='true'> Wallets </NavLink></li>
                    <li> <NavLink to='/transactions' exact='true'> Transactions </NavLink></li>
                    <li> <NavLink to='/password/edit' exact='true'> User </NavLink></li>
                </ul>
            </div>

            <div className="footer-rs">
                <ul>
                    {/* <h4>Social Network</h4>
                    <li> <a href="#"> <AiFillFacebook /> </a> </li>
                    <li> <a href="#"> <AiFillTwitterCircle /> </a> </li>
                    <li> <a href="#"> <AiFillInstagram /> </a></li> */}
                    <h4>
                      Contact
                    </h4>
                    <li>tayatodev@gmail.com</li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;