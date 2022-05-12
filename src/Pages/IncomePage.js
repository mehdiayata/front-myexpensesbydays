import React from 'react';
import Income from '../Components/Budget/Income';
import BreadcrumbNav from '../Components/Navigation/BreadcrumbNav';

const IncomePage = () => {
    return (
        <div className='income-page'>
            <BreadcrumbNav title="Income" />

            <Income />

        </div>
    );
};

export default IncomePage;