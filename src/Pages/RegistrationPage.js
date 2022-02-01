import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import RegistrationForm from '../Security/RegistrationForm';


const RegistrationPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('JWT') && localStorage.getItem('refresh_token')) {
            navigate('/transaction');
        }
    })

    return (
        <div className="registration_page">
            <RegistrationForm />
        </div>
    );
};

export default RegistrationPage;