import './App.css';
import { Routes, Route, HashRouter } from "react-router-dom";
import NotFound from './Pages/NotFound';
import LoginPage from './Pages/LoginPage';
import walletService from './Services/wallet.service';
import { useEffect } from 'react';
import securityService from './Services/security.service';
//import RegistrationPage from './Pages/RegistrationPage';
import WalletPage from './Pages/WalletPage';
import PasswordEditPage from './Pages/PasswordEditPage';
import Footer from './Components/Navigation/Footer';
import Navigation from './Components/Navigation/Navigation';
import NavigationMobile from './Components/Navigation/NavigationMobile';
import TransactionPage from './Pages/TransactionPage';
import IncomePage from './Pages/IncomePage';
import CoastPage from './Pages/CoastPage';
import SavingPage from './Pages/SavingPage';
import HomePage from './Pages/HomePage';
import TutoPage from './Pages/TutoPage';
import BudgetPage from './Pages/BudgetPage';

function App() {

  if (localStorage.getItem('JWT') !== 'undefined' && localStorage.getItem('JWT') !== null) {
    securityService.refreshTokenResponse();
    securityService.refreshTokenRequest();
  }

  useEffect(() => {
    
    // Si l'user n'est pas connecté
    if (localStorage.getItem('JWT') !== 'undefined' && localStorage.getItem('JWT') !== null) {

      // Get wallet by default and add in localStorage 
      walletService.getMainWallet().then((resp) => {
        localStorage.setItem('current_wallet', resp.data.id);
      });
    }

  });

  return (
    <div className="App">
      <HashRouter>
        <Navigation />
        <Routes>
          <Route component={NotFound} />

          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/transactions" element={<TransactionPage />} />
{/* 
          <Route path="/registration" element={<RegistrationPage />} /> */}
          <Route path="/wallets" element={<WalletPage />} />
          <Route path="/password/edit" element={<PasswordEditPage />} />
          
          <Route path="/income" element={<IncomePage />} />
          <Route path="/coast" element={<CoastPage />} />
          
          <Route path="/saving" element={<SavingPage />} />
          
          <Route path="/home" element={<HomePage />} />
          
          <Route path="/tuto" element={<TutoPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          
        </Routes>

        <NavigationMobile />
        <Footer />
      </HashRouter>


    </div>
  );
}

export default App;
