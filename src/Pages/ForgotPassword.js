import React, { useEffect, useState } from 'react';
import { Alert, Breadcrumb, Button, Form, Spinner } from 'react-bootstrap';
import BreadcrumbNav from '../Components/Navigation/BreadcrumbNav';
import securityService from '../Services/security.service';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSending, setIsSending] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false);
        setEmail('');

    }, [isSending])

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (email !== null) {
            securityService.forgotPassword(email).then((resp) => {
                setIsSending(true)
                setIsLoading(false);

            }).catch((err) => {
                setIsSending(false)
                setIsLoading(false);
            })
        }
    }

    const alert = () => {
        if (isSending !== null) {
            if (isSending === true) {
                return (
                    <Alert variant="success">
                        <Alert.Heading> Email sending </Alert.Heading>
                        <p>
                            Please check your email, for reset your password
                        </p>
                    </Alert>
                )
            } else {
                return (
                    <Alert variant="danger">
                        <Alert.Heading> Error </Alert.Heading>
                        <p>
                            Sorry but your email don't exist, in your application
                        </p>
                    </Alert>
                )
            }
        }
    }

    return (
        <div className="forgot-password">

            <BreadcrumbNav title="Forget Password" />

            <div className='forgot-password-text'>
                <h3> Forgot your password ?</h3>
                <p>Don't worry ! Just fill in your email, if we can match it we'll send you a link to reset your password.</p>

            </div>
            <Form onSubmit={(e) => submit(e)} className="form-forgot-password">
                <Form.Group className="form-forgot-password-container">

                    <Form.Label> Email Adress </Form.Label>
                    <Form.Control
                        required
                        type="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />

                    {isLoading == false &&
                        <Button variant="info " type="submit">
                            Reset Password
                        </Button>
                    }

                    {isLoading == true && 
                         <Button variant="info " disabled>
                         <Spinner
                           as="span"
                           animation="grow"
                           size="sm"
                           role="status"
                           aria-hidden="true"
                         />
                         Loading...
                       </Button>
                    }

                </Form.Group>

            </Form>

            {alert()}
        </div>
    );
};

export default ForgotPassword;