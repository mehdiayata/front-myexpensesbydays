import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import BreadcrumbNav from '../Components/Navigation/BreadcrumbNav';
import securityService from '../Services/security.service';

const ResetPassword = () => {

    const search = useLocation().search;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValid, setIsValid] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const resetPasswordKey = new URLSearchParams(search).get('key');
    const email = new URLSearchParams(search).get('email');
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState(false);

    useEffect(() => {
        if (email === null && resetPasswordKey === null) {
            navigate('/login', {
                state: {
                    passwordReset: 1
                }
            });
        }
    }, [isLoading])

    const submit = (e) => {
        e.preventDefault();

        setPasswordError(false);
        setIsLoading(true);

        if (password !== null && password === confirmPassword) {
            securityService.resetPassword(email, password, resetPasswordKey).then((resp) => {
                setIsValid(false);
                navigate('/login', {
                    state: {
                        passwordReset: 1
                    }
                });

            }).catch((err) => {
                setIsValid(false);
            })
        } else {
            setIsLoading(false);
            setPasswordError(true);
        }
    }


    const alert = () => {
        if (isValid !== null) {
            if (isValid === false) {
                return (
                    <Alert variant="danger">
                        <Alert.Heading> Error </Alert.Heading>
                        <p>
                            Sorry, an error has occurred. Please retry.
                        </p>
                    </Alert>
                )
            }
        }
    }

    const displayError = (e) => {
        if (passwordError === true) {
            return (
                <Alert variant="warning">
                    <Alert.Heading> Error </Alert.Heading>
                    <p>
                        Your passwords are not the same, please retry.
                    </p>
                </Alert>
            )
        }
    }

    return (
        <div className="reset-password-page">
            <BreadcrumbNav title="Reset Password" />


            <div className='reset-password-text'>
                <h3> Reset your password</h3>
                <p> Please, enter your new password</p>

            </div>

            <Form onSubmit={(e) => submit(e)} className="form-reset-password">
                <Form.Group className="form-reset-password-container">

                    <Form.Label> Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                </Form.Group>

                <Form.Group className="form-reset-password-container">
                    <Form.Label> Confirm your password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        onChange={e => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />

                </Form.Group>


                {isLoading == false &&
                    <Button variant="info " type="submit">
                        Submit
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


            </Form>

            {alert()}

            {displayError()}

        </div>
    );
};

export default ResetPassword;