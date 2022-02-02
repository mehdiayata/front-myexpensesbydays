import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import walletService from '../Services/wallet.service';
import { useNavigate } from 'react-router-dom';
import securityService from '../Services/security.service';

const LoginComponents = () => {

    const [formEmail, setFormEmail] = useState();
    const [formPassword, setFormPassword] = useState();
    const [idCurrentWallet, setIdCurrentWallet] = useState();
    const [credentialValid, setCrendentailValid] = useState();
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);


    const login = (e) => {

        e.preventDefault();
        setIsLoading(true);

        // Get token and add in local storage (à changer par un système plus sécurisé)
        securityService.getToken(formEmail, formPassword).then(resp => {

            localStorage.setItem("JWT", resp.data.token);
            localStorage.setItem("refresh_token", resp.data.refresh_token);

            // Défini le wallet principal après la connexion
            walletService.getMainWallet().then((resp) => {
                localStorage.setItem("current_wallet", resp.data.id);
                
                setIsLoading(false);
                navigate('/transactions');
            });

        }).catch((error) => {
            if (error.response.status === 401) {
                setIsLoading(false);
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
                {isLoading == false &&
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                }

                {isLoading == true &&
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

            {loginError}
        </div>
    );
};

export default LoginComponents;