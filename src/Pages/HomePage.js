import React, { useEffect, useState } from 'react';
import AuthorizedExpense from '../Components/Budget/AuthorizedExpense';
import TransactionAdd from '../Components/Transaction/TransactionAdd';
import WalletRead from '../Components/Wallet/WalletRead';
import BreadcrumbNav from '../Components/Navigation/BreadcrumbNav';
import { Spinner } from 'react-bootstrap';
import walletService from '../Services/wallet.service';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [wallet, setWallet] = useState(null);
  const [onSubmitAdd, setOnSubmitAdd] = useState(false);
  const [addTransactionButton, setAddTransactionButton] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let currentWallet = localStorage.getItem('current_wallet');
    // Redirecting if not connecting
    if (localStorage.getItem('JWT') == null) {
      navigate('/login');
    }


    if (localStorage.getItem('current_wallet')) {
      walletService.getWallet(currentWallet).then((resp) => {
        setWallet(resp.data);
        setIsLoading(false);
      })
    }

  }, [onSubmitAdd])

  const displayWalletRead = () => {
    if (wallet !== null) {
      return (
        <WalletRead onSubmitAdd={onSubmitAdd} amount={wallet.amount} />
      )
    }
  }

  const displayAuthorizedExpense = () => {
    if (wallet !== null) {
      return (
        <AuthorizedExpense onSubmitAdd={onSubmitAdd} authorizedExpenses={wallet.authorizedExpenses} />
      )
    }
  }

  const displayTransactionAdd = () => {
    if (wallet !== null) {
      return (
        <TransactionAdd walletSelected={wallet.id} setOnSubmitAdd={setOnSubmitAdd}
          addTransactionButton={addTransactionButton}
          setAddTransactionButton={setAddTransactionButton}
        />
      )
    }
  }

  if (isLoading == false) {
    return (
      <div className='homepage'>
        <BreadcrumbNav title={'HomePage'} />

        <div className="homepage-container">
          <div className='homepage-container-1'>
            {displayWalletRead()}
            {displayAuthorizedExpense()}
          </div>

          <div className="homepage-container-2">
            {displayTransactionAdd()}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='spinner-page'>
        <Spinner animation='border' className="spinner" />
      </div>
    )
  }
};

export default HomePage;