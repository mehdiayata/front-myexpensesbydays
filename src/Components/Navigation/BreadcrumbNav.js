import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

const BreadcrumbNav = (props) => {
    const {title} = props;
    
    return (
        <div className="breadcrumb-nav">
            <Breadcrumb>
                <Breadcrumb.Item>
                    {title}
            </Breadcrumb.Item>
            </Breadcrumb>


        </div>
    );
};

export default BreadcrumbNav;