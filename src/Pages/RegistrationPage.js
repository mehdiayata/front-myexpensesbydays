import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import RegistrationForm from '../Security/RegistrationForm';
import BreadcrumbNav from '../Components/Navigation/BreadcrumbNav';

const RegistrationPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('JWT') && localStorage.getItem('refresh_token')) {
            navigate('/transactions');
        }
    })

    return (
        <div className="registration-page">
            <BreadcrumbNav title="Register"/>
            <RegistrationForm />
        </div>
    );
};

export default RegistrationPage;