import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import LoginComponents from '../Security/LoginComponents';


const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('JWT') && localStorage.getItem('refresh_token')) {
            navigate('/transactions');
        } else {

            localStorage.clear();
        }
    })

    return (
        <div className="loginPage">

            <LoginComponents />

        </div>
    );
};

export default LoginPage;