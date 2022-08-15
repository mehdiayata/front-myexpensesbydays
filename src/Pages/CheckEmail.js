import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import securityService from '../Services/security.service';

const CheckEmail = () => {
    // Récupère les paramètres
    const search = useLocation().search;
    const key = new URLSearchParams(search).get('key');
    const email = new URLSearchParams(search).get('email');
    const navigate = useNavigate();
    const [spinner, setSpinner] = useState(true);


    useEffect(() => {
        if (email && key) {
            // Appelle de l'API 
            securityService.checkEmail(email, key).then((resp) => {

                navigate('/login', {
                    state: {
                        emailValid : 1
                    }
                });

            }).catch((err) => {

                if(err.response.data.data === 'Your account is already verified') {
                    navigate('/login', {
                        state: {
                            emailValid : 2
                        }
                    });

                } else if (err.response.data.data == 'Your token and email is not correct') {

                    navigate('/login', {
                        state: {
                            emailValid : 3
                        }
                    });

                } else {
                    alert('Error !')
                }

                

            })
        }
    })

    return (
        spinner ?
            <div className="check-email">

                <Spinner animation="border" />
            </div>
            :
            <></>
    );
};

export default CheckEmail;