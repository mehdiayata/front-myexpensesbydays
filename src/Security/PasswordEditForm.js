import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import securityService from '../Services/security.service';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router';

const PasswordEditForm = () => {
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const navigate = useNavigate();

    const verifyNewPassword = () => {
        if (newPassword == confirmPassword) {
            return true;
        } else {
            return false;
        }
    }

    const editPassword = (e) => {
        e.preventDefault();

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

                        // Redirection
                        navigate('/transaction');
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


                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default PasswordEditForm;