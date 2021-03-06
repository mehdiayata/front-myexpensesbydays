import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import securityService from '../Services/security.service';
import { NavLink, useNavigate } from 'react-router-dom';

const RegistrationForm = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const registration = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (confirmPassword === password) {
            securityService.registration(email, password).then((resp) => {

                navigate('/login');
            })
        } else {
            alert('Your password is incorrect');
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
                    <Form.Control type="password" placeholder="myPassword1375" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="myPassword1375" onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>

                {isLoading === false &&
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                }

                {isLoading === true &&
                    <Button variant="primary" disabled>
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



            <NavLink className="registration-btn-login" to='/login' exact='true' activeclassname="nav-active">
                Login
            </NavLink>
        </div>
    );
};

export default RegistrationForm;