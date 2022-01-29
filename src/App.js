import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NotFound from './Pages/NotFound';
import LoginPage from './Pages/LoginPage';
import Transaction from './Pages/Transaction';
import walletService from './Services/wallet.service';
import { useEffect } from 'react';
import axios from 'axios';
import securityService from './Services/security.service';
import RegistrationPage from './Pages/RegistrationPage';
import WalletPage from './Pages/WalletPage';
import PasswordEditPage from './Pages/PasswordEditPage';

function App() {

  
  securityService.refreshTokenResponse();
  securityService.refreshTokenRequest();

  useEffect(() => {


    // Si l'user n'est pas connecté
    if (localStorage.getItem('JWT') != null) {

      // Get wallet by default and add in localStorage 
      walletService.getMainWallet().then((resp) => {
        localStorage.setItem('current_wallet', resp.data.id);
      });
    }


  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route component={NotFound} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/wallets" element={<WalletPage />} />
          <Route path="/password/edit" element={<PasswordEditPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
