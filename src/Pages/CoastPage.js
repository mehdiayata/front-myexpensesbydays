import React from 'react';
import Coast from '../Components/Budget/Coast';
import BreadcrumbNav from '../Components/Navigation/BreadcrumbNav';

const CoastPage = () => {
    return (
        <div className='coast-page'>
            
            <BreadcrumbNav title="Coast" />

            <Coast />
        </div>
    );
};

export default CoastPage;