import React from 'react';
import { Alert } from 'react-bootstrap';
import BreadcrumbNav from '../Components/Navigation/BreadcrumbNav';

const ConfirmEmailRegistration = () => {
    return (
        <div className="confirm-email-registration">
            <BreadcrumbNav title="Confirmation" />

            <Alert variant="success ">
                <Alert.Heading>Email confirmation</Alert.Heading>
                <p>
                    Thank you for using my Expenses By Days, we have successfully register in application.
                </p>
                <hr />
                <p className="mb-0">
                    To connect to the application, you must validate your account. Access your emails, and click on the validation link.
                </p>

                <hr />
                <p className="mb-0">
                    <a href="/#/login">Go to login page</a>   
                </p>

                
            </Alert>

        </div>
    );
};

export default ConfirmEmailRegistration;