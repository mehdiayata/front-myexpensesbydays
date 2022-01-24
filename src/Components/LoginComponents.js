import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import securityService from '../Services/security.service';
import walletService from '../Services/wallet.service';
import { useNavigate } from 'react-router-dom';

const LoginComponents = () => {

    const [formEmail, setFormEmail] = useState();
    const [formPassword, setFormPassword] = useState();
    const [idCurrentWallet, setIdCurrentWallet] = useState();
    const [credentialValid, setCrendentailValid] = useState();
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();


    const login = (e) => {

        e.preventDefault();

        // Get token and add in local storage (à changer par un système plus sécurisé)
        securityService.getToken(formEmail, formPassword).then(resp => {
           
            localStorage.setItem("JWT", resp.data.token);
            localStorage.setItem("refresh_token", resp.data.refresh_token);

            // Défini le wallet principal après la connexion
            walletService.getMainWallet().then((resp) => {
                localStorage.setItem("current_wallet", resp.data.id);
            });

            navigate('/transaction');
        }).catch((error) => {
            if(error.response.status === 401) {
                setCrendentailValid(false);
                setLoginError("Sorry your email or your password is not correct");
            } else {
                console.log(error);
            }
        })

    }

    return (
        <div className="form-login">
            <Form onSubmit={login} method='post' >
                <Form.Group controlId='form-login-email'>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control required name="formLoginEmail" type="email" placeholder="Ex. test@test.fr" onChange={(e) => setFormEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                 </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLoginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="myPassword1375" onChange={(e) => setFormPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {loginError}
        </div>
    );
};

export default LoginComponents;