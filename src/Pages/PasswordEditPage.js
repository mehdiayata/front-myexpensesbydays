import React, { useEffect } from 'react';
import PasswordEditForm from '../Security/PasswordEditForm';
import Navigation from '../Components/Navigation/Navigation';
import BreadcrumbNav from '../Components/Navigation/BreadcrumbNav';
import { useNavigate } from 'react-router';

const PasswordEditPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('JWT') == null) {
            navigate('/login');
        }
    })

    return (
        <div className="password-edit-page">
            <BreadcrumbNav title="Edit password" />
            <PasswordEditForm />
        </div>
    );
};

export default PasswordEditPage;