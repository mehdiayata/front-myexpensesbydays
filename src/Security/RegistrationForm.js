import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import securityService from '../Services/security.service';

const RegistrationForm = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const registration = (e) => {
        
        e.preventDefault();
        securityService.registration(email, password).then((resp) => {
            console.log('registration OK');
            console.log(resp);
        })
    }

    return (
        <div className="registration_form">
            <Form onSubmit={registration} method='post' >
                <Form.Group controlId='form-login-email'>
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

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default RegistrationForm;