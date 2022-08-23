import React, { useEffect, useState } from 'react';
import Coast from '../Components/Budget/Coast';
import Income from '../Components/Budget/Income';
import WalletEdit from '../Components/Wallet/WalletEdit'
import WalletSaving from '../Components/Wallet/WalletSaving';
import BreadcrumbNav from '../Components/Navigation/BreadcrumbNav';
import { Button, ProgressBar, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import securityService from '../Services/security.service';
import jwtDecode from 'jwt-decode';

const TutoPage = () => {
    const [idWalletEdit, setIdWalletEdit] = useState();
    const [onSubmit, setOnSubmit] = useState(false);
    const [editWalletButton, setEditWalletButton] = useState();
    const [spinner, setSpinner] = useState(true);
    const [step, setStep] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        let jwtUserData = jwtDecode(localStorage.getItem('JWT'));
        console.log(jwtUserData);

        // Vérifie si l'utilisateur est à sa première connexion
        if(jwtUserData.firstUse === true) {
            securityService.editFirstUse(jwtUserData.id, false);
        }


        if (onSubmit == true) {
            setStep(step + 1);
        }

        setOnSubmit(false);
        setIdWalletEdit(localStorage.getItem('current_wallet'));

        // Défini le cookie first_use à false
        if (Cookies.get('first_use') !== undefined && Cookies.get('first_use') === true) {
            Cookies.set('first_use', false, { expires: 3650 })
        }


    }, [step, onSubmit]);


    const displayPage = () => {

        if (step === 0) {

            {/* Wallet Amount */ }
            return <div className="tuto-wallet-edit">
                <div className='tuto-step'>
                    <ProgressBar now={0} label="1/4" animated variant="info" />
                </div>

                <p className='text-info'>Please indicate the sum of your wallet</p>
                <WalletEdit editWalletButton={editWalletButton}
                    setEditWalletButton={setEditWalletButton}
                    idWalletEdit={idWalletEdit}
                    setIdWalletEdit={setIdWalletEdit}
                    setOnSubmitEdit={setOnSubmit}
                    setSpinner={setSpinner}
                    spinner={spinner}
                />
            </div>


        } else if (step === 1) {

            <ProgressBar now={25} />
            return <div className='tuto-income'>
                <div className='tuto-step'>

                    <ProgressBar now={25} animated variant="info" />
                </div>

                <Income setOnSubmitBudget={setOnSubmit} setSpinner={setSpinner} spinner={spinner} />
            </div>

        } else if (step === 2) {
            return <div className='tuto-coast'>
                <div className='tuto-step'>

                    <ProgressBar now={50} animated variant="info" />
                </div>
                <Coast setOnSubmitBudget={setOnSubmit} setSpinner={setSpinner} spinner={spinner} />;
            </div>
        } else if (step === 3) {
            return <div className='tuto-wallet-saving'>
                <div className='tuto-step'>
                    <ProgressBar now={75} animated variant="info" />
                </div>
                <WalletSaving setOnSubmitSaving={setOnSubmit} setSpinner={setSpinner} spinner={spinner} />
            </div>
        } else {

            navigate('/home');
        }
    }


    return (
        <div className='tuto-page'>

            <BreadcrumbNav title="Tutorial" />

            {displayPage()}


        </div>
    );
};

export default TutoPage;