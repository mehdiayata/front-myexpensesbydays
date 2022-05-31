import React, { useState } from 'react';
import Income from '../Components/Budget/Income';
import BreadcrumbNav from '../Components/Navigation/BreadcrumbNav';

const IncomePage = () => {
    const [onSubmit, setOnSubmit] = useState(false);
    const [spinner, setSpinner] = useState(false);
    return (
        <div className='income-page'>
            <BreadcrumbNav title="Income" />

            <Income setOnSubmitBudget={setOnSubmit} spinner={spinner} setSpinner={setSpinner}/>

        </div>
    );
};

export default IncomePage;