import React, { useState } from 'react';
import Coast from '../Components/Budget/Coast';
import BreadcrumbNav from '../Components/Navigation/BreadcrumbNav';

const CoastPage = () => {
    
    const [onSubmit, setOnSubmit] = useState(false);
    const [spinner, setSpinner] = useState(false);
    
    return (
        <div className='coast-page'>
            
            <BreadcrumbNav title="Coast" />

            <Coast setOnSubmitBudget={setOnSubmit} onSubmit={onSubmit} spinner={spinner} setSpinner={setSpinner}/>
        </div>
    );
};

export default CoastPage;