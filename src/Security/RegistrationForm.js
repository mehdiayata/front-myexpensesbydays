import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import securityService from '../Services/security.service';
import { NavLink, useNavigate } from 'react-router-dom';

const RegistrationForm = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [registerError, setRegisterError] = useState(false);
    const [mailAlreadyExist, setMailAlreadyExist] = useState(false);


    const registration = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (confirmPassword === password) {
            setRegisterError(false);
            securityService.registration(email, password).then((resp) => {

                navigate('/confirmRegistration');
            }).catch((err) => {
                if(err.response.data.message == 'Your email is already use') {
                    setMailAlreadyExist(true);
                }
                setIsLoading(false);
            })
        } else {
            setRegisterError(true);
            
            setIsLoading(false);
        }
    }

    const displayError = (e) => {
        if (registerError === true) {
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

    const displayErrorMailAlreadyExist = (e) => {
        if (mailAlreadyExist === true) {
            return (
                <Alert variant="warning">
                    <Alert.Heading> Error </Alert.Heading>
                    <p>
                        Your email is already use. Please change your email.
                    </p>
                </Alert>
            )
        }

    }

    return (
        <div className="registration">
            <Form onSubmit={registration} method='post' id="registration-form" >
                <Form.Group controlId='registration-form-email'>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control required name="formLoginEmail" type="email" placeholder="Ex. test@test.fr" onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLoginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="myPassword1375" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required minLength="8" onChange={(e) => setPassword(e.target.value)} />
                    <Form.Text className="text-muted">
                    8 or more characters that are of at least one number, and one uppercase and lowercase letter
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="myPassword1375" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>

                {isLoading == false &&
                    <Button className="login-btn-submit" variant="info" type="submit">
                        Submit
                    </Button>
                }

                {isLoading == true &&
                    <Button className="login-btn-submit" variant="primary" disabled>
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



            {displayError()}
            {displayErrorMailAlreadyExist()}


            <NavLink className="registration-btn-login" to='/login' exact='true' activeclassname="nav-active">
                If you have already an account, log in.
            </NavLink>
        </div>
    );
};

export default RegistrationForm;