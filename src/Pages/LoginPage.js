import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import LoginComponents from '../Security/LoginComponents';
import BreadcrumbNav from '../Components/Navigation/BreadcrumbNav';


const LoginPage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [accountCheck, setAccountCheck] = useState(null);

    useEffect(() => {

        if (state) {
            setAccountCheck(state.emailValid);
        }
        if (localStorage.getItem('JWT') && localStorage.getItem('refresh_token')) {
            navigate('/');
        } else {

            localStorage.clear();
        }
    })

    return (
        <div className="login-page">
            <BreadcrumbNav title="Login" />
            <LoginComponents accountCheck={accountCheck} />
        </div>
    );
};

export default LoginPage;