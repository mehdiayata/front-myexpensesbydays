import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import LoginComponents from '../Security/LoginComponents';
import BreadcrumbNav from '../Components/Navigation/BreadcrumbNav';


const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('JWT') && localStorage.getItem('refresh_token')) {
            navigate('/');
        } else {

            localStorage.clear();
        }
    })

    return (
        <div className="login-page">
            <BreadcrumbNav title="Login" />
            <LoginComponents />
        </div>
    );
};

export default LoginPage;