import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import walletService from '../Services/wallet.service';
import { useNavigate } from 'react-router-dom';
import securityService from '../Services/security.service';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const LoginComponents = (props) => {

    const [formEmail, setFormEmail] = useState();
    const [formPassword, setFormPassword] = useState();
    const [credentialValid, setCrendentailValid] = useState();
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { accountCheck } = props;


    const login = (e) => {

        e.preventDefault();
        setIsLoading(true);

        // Get token and add in local storage (à changer par un système plus sécurisé)
        securityService.getToken(formEmail, formPassword).then(resp => {

            // Check account if is verified
            let checkAccount = jwtDecode(resp.data.token);

            if (checkAccount.verified === true) {

                localStorage.setItem("JWT", resp.data.token);
                localStorage.setItem("refresh_token", resp.data.refresh_token);

                // Défini le wallet principal après la connexion
                walletService.getMainWallet().then((resp) => {
                    localStorage.setItem("current_wallet", resp.data.id);

                    setIsLoading(false);
                    console.log(Cookies.get('first_use'));

                    // Vérifie et créer le cookie first_use + redirection selon la valeur du cookie
                    if (Cookies.get('first_use') === undefined) {
                        Cookies.set('first_use', true, { expires: 3650 })
                        navigate('/tuto');
                    } else {
                        if (Cookies.get('first_use') === true) {
                            navigate('/tuto');
                        } else {
                            navigate('/home')
                        }
                    }
                });

            } else {

                setLoginError("Your account is not validate, please check your email for validate your account or contact support");
                setIsLoading(false);
            }

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

    // const handleNotAccount = () => {
    //     console.log('test');
    //     navigate('/registration');

    // }




    const checkAccount = () => {
        if (accountCheck !== null) {
            if (accountCheck === 1) {
                return (
                    <Alert variant="success">
                        <Alert.Heading>Welcome in myExpensesByDays !</Alert.Heading>
                        <p>
                            Your account is validated, you can log in

                        </p>
                    </Alert>
                )
            } else if (accountCheck === 2) {
                return (
                    <Alert variant="primary">
                        <Alert.Heading>Welcome in myExpensesByDays !</Alert.Heading>
                        <p>
                            Your account is already validated, you can log in

                        </p>
                    </Alert>
                )
            } else if (accountCheck === 3) {
                return (
                    <Alert variant="danger">
                        <Alert.Heading>Sorry, but we have an error !</Alert.Heading>
                        <p>
                            An error has occurred please contact support, or try to log.

                        </p>
                    </Alert>
                )

            }
        }

    }

    return (
        <div className="login">

            {checkAccount()}

            <Alert variant="warning">
                <Alert.Heading>This application is in a beta test</Alert.Heading>
                <p>

                    It is not yet possible to use the app, before its final deployment

                </p>
                <hr />
                <p className="mb-0">To subscribe to the beta test, contact us: <strong>ayatadev@outlook.com</strong>
                </p>
            </Alert>
            <Form onSubmit={login} method='post' id='login-form'>
                <Form.Group >
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control required name="formLoginEmail" type="email" placeholder="Ex. test@test.fr" onChange={(e) => setFormEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLoginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Ex. myPassword1375.!*" onChange={(e) => setFormPassword(e.target.value)} />
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


            {/* 
            <NavLink className="login-btn-new-account" to='/registration' exact='true' activeclassname="nav-active">
                Create a new account
                </NavLink> */}

            {loginError.length > 0 &&
                <Alert variant="danger">
                    <Alert.Heading> Error </Alert.Heading>
                    <p>
                        {loginError}
                    </p>
                </Alert>
            }
        </div>
    );
};

export default LoginComponents;