import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import BreadcrumbNav from '../Components/Navigation/BreadcrumbNav';
import securityService from '../Services/security.service';
import { useNavigate } from 'react-router';


const DeleteAccountPage = () => {
    const [password, setPassword] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {


    }, [confirmDelete, error])

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(false);

        let email = jwtDecode(localStorage.getItem('JWT')).username;

        // Appel à la route login 
        securityService.getToken(email, password).then((resp) => {
            setConfirmDelete(true);


        }).catch((err) => {
            setError(true);
            setIsLoading(false);
        })

    }

    const handleValidDeleteButton = (valid) => {
        if (valid === true) {

            let idUser = jwtDecode(localStorage.getItem('JWT')).id;

            securityService.deleteAccount(idUser).then((resp) => {
                
            localStorage.clear();
                navigate('/login', {
                    state: {
                        accountDelete: 1
                    }
                })
            })

        } else {
            setConfirmDelete(false);
            setIsLoading(false);
        }
    }

    const displayConfirmDelete = () => {
        if (confirmDelete === true) {
            return (
                <Alert variant="danger">
                    <p>
                        Do you confirm delete your account ?</p>

                    <Button variant="danger" onClick={(e) => handleValidDeleteButton(true)}> Yes </Button>
                    <Button variant="secondary" onClick={(e) => handleValidDeleteButton(false)}> No </Button>
                </Alert>
            )
        }

    }

    const displayError = () => {
        if (error === true) {
            return (
                <Alert variant="warning">
                    <p>
                        Your password is incorrect</p>

                </Alert>
            )
        }
    }

    return (

        <div className='delete-account-page'>

            <BreadcrumbNav title='Delete account' />

            <div className='delete-account-text'>
                <h3> Do you want to delete your account</h3>
                <p> You are going to delete your account, be careful any permanent deletion is irreversible.</p>

            </div>

            <Form onSubmit={(e) => submit(e)} id="delete-account-form">
                <Form.Group className="mb-3" controlId="delete-acount-form-password">
                    <Form.Label>Please Enter your password</Form.Label>
                    <Form.Control type="password" placeholder="Your password" required onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>


                {isLoading == false &&
                    <Button variant="danger " type="submit">
                        Delete Account
                    </Button>
                }

                {isLoading == true &&
                    <Button variant="danger " disabled>
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

            {displayConfirmDelete()}
            {displayError()}


        </div>
    );
};

export default DeleteAccountPage;