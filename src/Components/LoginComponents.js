import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import securityService from '../Services/security.service';

const LoginComponents = () => {

    const [formEmail, setFormEmail] = useState();
    const [formPassword, setFormPassword] = useState();

    const login = (e) => {

        e.preventDefault();

        // Get token and add in local storage (à changer par un système plus sécurisé)
        securityService.getToken(formEmail, formPassword).then(resp => {
            localStorage.setItem("JWT", resp.data.token);
        });


    }

    return (
        <div className="form-login">
            <Form onSubmit={login} method='post' >
                <Form.Group controlId='form-login-email'>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control required name="formLoginEmail" id="formLoginEmail" type="email" placeholder="Ex. test@test.fr" onChange={(e) => setFormEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                 </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLoginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" id="formLoginPassword" placeholder="myPassword1375" onChange={(e) => setFormPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default LoginComponents;