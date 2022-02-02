import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import securityService from '../Services/security.service';
import { useNavigate } from 'react-router';


const PasswordEditForm = () => {
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState(false);

    const verifyNewPassword = () => {
        if (newPassword == confirmPassword) {
            return true;
        } else {
            return false;
        }
    }

    const editPassword = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setConfirmMessage(false);
        // Vérifie si les password inscrit sont identique
        let validEdit = verifyNewPassword();

        let jwt = jwtDecode(localStorage.getItem('JWT'));
        let user = jwt;

        if (validEdit == true) {
            securityService.getToken(user['username'], oldPassword).then((resp) => {
                securityService.editPassword(user['id'], newPassword).then((resp) => {
                    securityService.getToken(user['username'], newPassword).then((resp) => {
                        // Reactualisation du token
                        localStorage.setItem("JWT", resp.data.token);
                        localStorage.setItem("refresh_token", resp.data.refresh_token);

                        setIsLoading(false);
                        setConfirmMessage(true);

                        e.target.reset();
                        // // Redirection
                        // navigate('/transaction');
                    })

                })

            });
        } else {
            console.log('ERROR');
        }
    }

    return (
        <div className="password-edit-form">
            <Form onSubmit={(e) => editPassword(e)}>
                <Form.Group className="mb-3" controlId="password-edit-form-old-password">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control type="password" placeholder="old password" onChange={(e) => setOldPassword(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password-edit-form-new-password">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="new password" onChange={(e) => setNewPassword(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password-edit-form-confirm-password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
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

            {confirmMessage == true &&
                <p> Your password is edited </p>
            }
        </div>
    );
};

export default PasswordEditForm;