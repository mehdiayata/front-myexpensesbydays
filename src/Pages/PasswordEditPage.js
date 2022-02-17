import React from 'react';
import PasswordEditForm from '../Security/PasswordEditForm';
import Navigation from '../Components/Navigation/Navigation';
import BreadcrumbNav from '../Components/Navigation/BreadcrumbNav';

const PasswordEditPage = () => {
    return (
        <div className="password-edit-page">
            <BreadcrumbNav title="Edit password" />
            <PasswordEditForm />            
        </div>
    );
};

export default PasswordEditPage;