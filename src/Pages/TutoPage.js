import React, { useEffect, useState } from 'react';
import Coast from '../Components/Budget/Coast';
import Income from '../Components/Budget/Income';
import WalletEdit from '../Components/Wallet/WalletEdit'
import WalletSaving from '../Components/Wallet/WalletSaving';
import BreadcrumbNav from '../Components/Navigation/BreadcrumbNav';
import { Button, ProgressBar, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const TutoPage = () => {
    const [idWalletEdit, setIdWalletEdit] = useState();
    const [onSubmit, setOnSubmit] = useState(false);
    const [editWalletButton, setEditWalletButton] = useState();
    const [spinner, setSpinner] = useState(true);
    const [step, setStep] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (onSubmit == true) {
            setStep(step + 1);
        }

        setOnSubmit(false);
        setIdWalletEdit(localStorage.getItem('current_wallet'));


    }, [step, onSubmit]);


    const displayPage = () => {

        if (step === 0) {

            {/* Wallet Amount */ }
            return <div className="tuto-wallet-edit">
                <div className='tuto-step'>
                    <ProgressBar now={0} label="1/4" animated variant="info"/>
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
                    
                <ProgressBar now={25}  animated variant="info"/>
                </div>

                <Income setOnSubmitBudget={setOnSubmit} setSpinner={setSpinner} spinner={spinner} />
            </div>

        } else if (step === 2) {
            return <div className='tuto-coast'>
                <div className='tuto-step'>

                    <ProgressBar now={50} animated variant="info"/>
                </div>
                <Coast setOnSubmitBudget={setOnSubmit} setSpinner={setSpinner} spinner={spinner} />;
            </div>
        } else if (step === 3) {
            return <div className='tuto-wallet-saving'>
                <div className='tuto-step'>
                    <ProgressBar now={75}  animated variant="info"/>
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